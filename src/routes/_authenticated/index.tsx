import { createFileRoute } from "@tanstack/react-router";
import { Upload, FileText, FileSpreadsheet, FileImage } from "lucide-react";
import { type ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { DataGrid } from "@/components/data-grid";
import { Badge } from "@/components/ui/badge";

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

type DocumentStatus = "Processed" | "Processing" | "Failed";

interface Document {
  id: string;
  name: string;
  type: "PDF" | "Spreadsheet" | "Image";
  size: string;
  status: DocumentStatus;
  uploadedAt: string;
}

const documents: Document[] = [
  {
    id: "1",
    name: "Q3 Financial Report.pdf",
    type: "PDF",
    size: "2.4 MB",
    status: "Processed",
    uploadedAt: "2026-07-14",
  },
  {
    id: "2",
    name: "Customer List.xlsx",
    type: "Spreadsheet",
    size: "856 KB",
    status: "Processed",
    uploadedAt: "2026-07-13",
  },
  {
    id: "3",
    name: "Invoice_2042.png",
    type: "Image",
    size: "1.2 MB",
    status: "Processing",
    uploadedAt: "2026-07-12",
  },
  {
    id: "4",
    name: "Contract Draft.pdf",
    type: "PDF",
    size: "4.1 MB",
    status: "Failed",
    uploadedAt: "2026-07-10",
  },
  {
    id: "5",
    name: "Marketing Assets.zip.pdf",
    type: "PDF",
    size: "6.8 MB",
    status: "Processed",
    uploadedAt: "2026-07-08",
  },
];

const typeIcon: Record<Document["type"], React.ReactNode> = {
  PDF: <FileText className="size-4 text-muted-foreground" />,
  Spreadsheet: <FileSpreadsheet className="size-4 text-muted-foreground" />,
  Image: <FileImage className="size-4 text-muted-foreground" />,
};

const statusVariant: Record<DocumentStatus, "default" | "secondary" | "destructive"> = {
  Processed: "default",
  Processing: "secondary",
  Failed: "destructive",
};

const columns: ColumnDef<Document>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
          {typeIcon[row.original.type]}
        </div>
        <span className="font-medium text-foreground">{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.type}</span>,
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.size}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={statusVariant[row.original.status]}>{row.original.status}</Badge>
    ),
  },
  {
    accessorKey: "uploadedAt",
    header: "Uploaded",
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.uploadedAt}</span>,
  },
];

function DashboardPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Documents</h1>
          <p className="text-sm text-muted-foreground">
            Manage and review your uploaded documents.
          </p>
        </div>
        <Button className="w-full sm:w-auto">
          <Upload className="size-4" />
          Upload Document
        </Button>
      </div>

      <section className="mt-8">
        <DataGrid columns={columns} data={documents} />
      </section>
    </main>
  );
}
