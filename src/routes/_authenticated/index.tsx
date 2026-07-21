import { createFileRoute } from "@tanstack/react-router";
import { Upload, FileText, FileSpreadsheet, FileImage, File as FileIcon, Trash2, Loader2 } from "lucide-react";
import { type ColumnDef } from "@tanstack/react-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { DataGrid } from "@/components/data-grid";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/_authenticated/")({
  head: () => ({
    meta: [
      { title: "Home — Dashboard" },
      { name: "description", content: "View and manage your uploaded documents." },
      { property: "og:title", content: "Home — Dashboard" },
      { property: "og:description", content: "View and manage your uploaded documents." },
    ],
  }),
  component: DashboardPage,
});

interface DocumentRow {
  id: string;
  name: string;
  file_type: string;
  size_bytes: number;
  storage_path: string;
  status: string;
  created_at: string;
}

type Category = "PDF" | "Spreadsheet" | "Image" | "Other";

function categorize(mime: string, name: string): Category {
  const lower = name.toLowerCase();
  if (mime === "application/pdf" || lower.endsWith(".pdf")) return "PDF";
  if (mime.startsWith("image/")) return "Image";
  if (
    mime.includes("spreadsheet") ||
    mime === "text/csv" ||
    /\.(xlsx?|csv|ods|numbers)$/.test(lower)
  ) return "Spreadsheet";
  return "Other";
}

const typeIcon: Record<Category, React.ReactNode> = {
  PDF: <FileText className="size-4 text-muted-foreground" />,
  Spreadsheet: <FileSpreadsheet className="size-4 text-muted-foreground" />,
  Image: <FileImage className="size-4 text-muted-foreground" />,
  Other: <FileIcon className="size-4 text-muted-foreground" />,
};

const statusVariant: Record<string, "default" | "secondary" | "destructive"> = {
  Processed: "default",
  Processing: "secondary",
  Failed: "destructive",
};

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const MAX_BYTES = 20 * 1024 * 1024; // 20 MB

function DashboardPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const { data: documents = [], isLoading } = useQuery({
    queryKey: ["documents", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("documents")
        .select("id, name, file_type, size_bytes, storage_path, status, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as DocumentRow[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (doc: DocumentRow) => {
      const { error: storageError } = await supabase.storage
        .from("documents")
        .remove([doc.storage_path]);
      if (storageError) throw storageError;
      const { error } = await supabase.from("documents").delete().eq("id", doc.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Document deleted");
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0 || !user) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        if (file.size > MAX_BYTES) {
          toast.error(`${file.name} exceeds the 20 MB limit`);
          continue;
        }
        const path = `${user.id}/${crypto.randomUUID()}-${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from("documents")
          .upload(path, file, { contentType: file.type || "application/octet-stream" });
        if (uploadError) {
          toast.error(`${file.name}: ${uploadError.message}`);
          continue;
        }
        const { error: insertError } = await supabase.from("documents").insert({
          user_id: user.id,
          name: file.name,
          file_type: file.type || "application/octet-stream",
          size_bytes: file.size,
          storage_path: path,
          status: "Processed",
        });
        if (insertError) {
          await supabase.storage.from("documents").remove([path]);
          toast.error(`${file.name}: ${insertError.message}`);
          continue;
        }
        toast.success(`${file.name} uploaded`);
      }
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleDownload(doc: DocumentRow) {
    const { data, error } = await supabase.storage
      .from("documents")
      .createSignedUrl(doc.storage_path, 60);
    if (error) {
      toast.error(error.message);
      return;
    }
    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  }

  const columns: ColumnDef<DocumentRow>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const category = categorize(row.original.file_type, row.original.name);
        return (
          <button
            onClick={() => handleDownload(row.original)}
            className="flex items-center gap-3 text-left hover:underline"
          >
            <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
              {typeIcon[category]}
            </div>
            <span className="font-medium text-foreground">{row.original.name}</span>
          </button>
        );
      },
    },
    {
      accessorKey: "file_type",
      header: "Type",
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {categorize(row.original.file_type, row.original.name)}
        </span>
      ),
    },
    {
      accessorKey: "size_bytes",
      header: "Size",
      cell: ({ row }) => (
        <span className="text-muted-foreground">{formatSize(row.original.size_bytes)}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={statusVariant[row.original.status] ?? "secondary"}>
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Uploaded",
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {new Date(row.original.created_at).toLocaleDateString()}
        </span>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => deleteMutation.mutate(row.original)}
          disabled={deleteMutation.isPending}
          aria-label={`Delete ${row.original.name}`}
        >
          <Trash2 className="size-4" />
        </Button>
      ),
    },
  ];

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Cases</h1>
          <p className="text-sm text-muted-foreground">
            Cases refered for convertions and their status
          </p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <Button
          className="w-full sm:w-auto"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
          {uploading ? "Uploading…" : "Upload Physician Details"}
        </Button>
      </div>

      <section className="mt-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-12 text-muted-foreground">
            <Loader2 className="size-5 animate-spin" />
          </div>
        ) : (
          <DataGrid columns={columns} data={documents} />
        )}
      </section>
    </main>
  );
}
