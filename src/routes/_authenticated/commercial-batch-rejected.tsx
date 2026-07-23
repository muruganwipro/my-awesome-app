import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Send, Ban } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/_authenticated/commercial-batch-rejected")({
  head: () => ({
    meta: [
      { title: "Commercial Batch rejected using CROUD" },
      { name: "description", content: "Record commercial batch rejection using CROUD and request MRB supplemental action." },
      { property: "og:title", content: "Commercial Batch rejected using CROUD" },
      { property: "og:description", content: "Record commercial batch rejection using CROUD and request MRB supplemental action." },
    ],
  }),
  component: CommercialBatchRejectedPage,
});

const initialValues = {
  commercialBatchRejected: true,
  dispositionCode: "",
  croudConfirmationRef: "",
  mrbSaId: "",
  closureComments: "",
  closedBy: "",
};

function CommercialBatchRejectedPage() {
  const [values, setValues] = useState(initialValues);

  function handleChange(field: keyof typeof values) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };
  }

  function handleToggle(checked: boolean) {
    setValues((prev) => ({ ...prev, commercialBatchRejected: checked }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    toast.success("Commercial batch rejected form submitted.");
    console.log("Commercial batch rejected payload:", values);
  }

  function handleCancel() {
    setValues(initialValues);
    toast.info("Form reset.");
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-10">
      <Link
        to="/workflows"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to Workflows
      </Link>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Commercial Batch rejected using CROUD</CardTitle>
          <CardDescription>
            Record the CROUD rejection and submit the MRB supplemental action request.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="pt-2">
              <h3 className="text-base font-semibold text-foreground">Commercial Batch Rejected Response</h3>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="grid gap-1">
                <Label htmlFor="commercialBatchRejected" className="font-medium">
                  Commercial Batch Rejected
                </Label>
                <p className="text-sm text-muted-foreground">Toggle to indicate whether the batch was rejected.</p>
              </div>
              <Switch
                id="commercialBatchRejected"
                checked={values.commercialBatchRejected}
                onCheckedChange={handleToggle}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="dispositionCode">Disposition Code</Label>
                <Input
                  id="dispositionCode"
                  type="text"
                  placeholder="REJECTED_CRO_UD"
                  value={values.dispositionCode}
                  onChange={handleChange("dispositionCode")}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="croudConfirmationRef">CROUD Confirmation Ref</Label>
                <Input
                  id="croudConfirmationRef"
                  type="text"
                  placeholder="CROUD-778899"
                  value={values.croudConfirmationRef}
                  onChange={handleChange("croudConfirmationRef")}
                />
              </div>
            </div>

            <div className="pt-2">
              <h3 className="text-base font-semibold text-foreground">Send request for MRB Supplemental Action</h3>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="grid gap-2">
                <Label htmlFor="mrbSaId">MRB SA Id</Label>
                <Input
                  id="mrbSaId"
                  type="text"
                  placeholder="MRBSA-2026-1001"
                  value={values.mrbSaId}
                  onChange={handleChange("mrbSaId")}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="closureComments">Closure Comments</Label>
                <Input
                  id="closureComments"
                  type="text"
                  placeholder="Supplemental action completion"
                  value={values.closureComments}
                  onChange={handleChange("closureComments")}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="closedBy">Closed By</Label>
                <Input
                  id="closedBy"
                  type="text"
                  placeholder="u_mrb_coord_1"
                  value={values.closedBy}
                  onChange={handleChange("closedBy")}
                />
              </div>
            </div>

            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:justify-between">
              <Button
                type="button"
                onClick={handleCancel}
                className="w-full bg-red-600 hover:bg-red-700 sm:w-auto"
              >
                Cancel
              </Button>
              <Button type="submit" className="w-full sm:w-auto">
                <Send className="size-4" />
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
