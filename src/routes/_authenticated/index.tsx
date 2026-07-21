import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Upload, Loader2 } from "lucide-react";
import { type ColumnDef } from "@tanstack/react-table";
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
      { title: "Home — BMS" },
      { name: "description", content: "View and manage your uploaded documents." },
      { property: "og:title", content: "Home — BMS" },
      { property: "og:description", content: "View and manage your uploaded documents." },
    ],
  }),
  component: DashboardPage,
});

interface CaseRow {
  id: string;
  physicianName: string;
  caseId: string;
  status: string;
  updatedDate: string;
  route: "/conversion-decision" | "/mrb-rejection";
}

const statusVariant: Record<string, "default" | "secondary" | "destructive"> = {
  "Conversion Decision to BMS": "default",
  "Upload MRB minutes": "secondary",
  Processed: "default",
  Processing: "secondary",
  Failed: "destructive",
};

const CASES: CaseRow[] = [
  {
    id: "1",
    physicianName: "Pamela Blair",
    caseId: "PB23421R",
    status: "Conversion Decision to BMS",
    updatedDate: "13/12/25",
    route: "/conversion-decision",
  },
  {
    id: "2",
    physicianName: "Jean Koff",
    caseId: "JK23345S",
    status: "Upload MRB minutes",
    updatedDate: "01/12/25",
    route: "/mrb-rejection",
  },
];

const MAX_BYTES = 20 * 1024 * 1024; // 20 MB

function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate({ from: "/" });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

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
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  const columns: ColumnDef<CaseRow>[] = [
    {
      accessorKey: "physicianName",
      header: "Physician Name",
      cell: ({ row }) => (
        <span className="font-medium text-foreground">{row.original.physicianName}</span>
      ),
    },
    {
      accessorKey: "caseId",
      header: "Case ID",
      cell: ({ row }) => (
        <span className="text-muted-foreground">{row.original.caseId}</span>
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
      accessorKey: "updatedDate",
      header: "Updated Date",
      cell: ({ row }) => (
        <span className="text-muted-foreground">{row.original.updatedDate}</span>
      ),
    },
  ];

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Cases</h1>
          <p className="text-sm text-muted-foreground">
            Cases referred for conversions and their status
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
        <DataGrid
          columns={columns}
          data={CASES}
          onRowClick={(row) => navigate({ to: row.route })}
        />
      </section>
    </main>
  );
}
