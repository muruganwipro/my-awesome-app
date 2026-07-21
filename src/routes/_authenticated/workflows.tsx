import { createFileRoute, Link } from "@tanstack/react-router";
import { GitBranch, MessageSquare, FileUp, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/_authenticated/workflows")({
  head: () => ({
    meta: [
      { title: "Workflows — Dashboard" },
      { name: "description", content: "Manage and monitor your workflows." },
      { property: "og:title", content: "Workflows — Dashboard" },
      { property: "og:description", content: "Manage and monitor your workflows." },
    ],
  }),
  component: WorkflowsPage,
});

function WorkflowsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      {/* <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Workflows</h1>
        <p className="text-sm text-muted-foreground">Build and automate your document workflows.</p>
      </div>

      <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/30 py-20">
        <div className="flex size-12 items-center justify-center rounded-full bg-accent">
          <GitBranch className="size-6 text-accent-foreground" />
        </div>
        <h2 className="mt-4 text-base font-medium text-foreground">No workflows yet</h2>
        <p className="mt-1 max-w-sm text-center text-sm text-muted-foreground">
          Create your first workflow to start processing documents automatically.
        </p>
      </div> */}

      <div className="mt-10">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Forms</h2>
        <p className="text-sm text-muted-foreground">Quick actions and intake forms.</p>

        <div className="mt-4 rounded-2xl border bg-card p-6 shadow-sm">
          <Link
            to="/conversion-decision"
            className="group flex items-center gap-4 rounded-xl border bg-background p-4 transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <MessageSquare className="size-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Communicate Conversion Decision to BMS</p>
              <p className="text-sm text-muted-foreground">Notify BMS of the conversion decision.</p>
            </div>
            <ArrowRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </main>
  );
}
