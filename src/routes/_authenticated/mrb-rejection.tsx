import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Send, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/_authenticated/mrb-rejection")({
  head: () => ({
    meta: [
      { title: "Upload MRB minutes and send batch rejection" },
      { name: "description", content: "Upload MRB minutes and send batch rejection details." },
      { property: "og:title", content: "Upload MRB minutes and send batch rejection" },
      { property: "og:description", content: "Upload MRB minutes and send batch rejection details." },
    ],
  }),
  component: MrbRejectionPage,
});

const initialValues = {
  patientId: "",
  lotId: "",
  physicianName: "",
  physicianEmail: "",
  initialConsultNotes: "",
  caseId: "",
  decisionCode: "",
  documentUploadCompleted: "true",
  reason: "",
  consultationNotes: "",
  batchNumber: "",
  materialCode: "",
  reasonCode: "",
};

function MrbRejectionPage() {
  const [values, setValues] = useState(initialValues);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleChange(field: keyof typeof values) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };
  }

  function handleRadioChange(value: string) {
    setValues((prev) => ({ ...prev, documentUploadCompleted: value }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      toast.success(`Selected MRB document: ${file.name}`);
    }
    if (e.target.value) e.target.value = "";
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    toast.success("MRB rejection form submitted.");
    console.log("MRB rejection payload:", {
      ...values,
      documentUploadCompleted: values.documentUploadCompleted === "true",
    });
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
          <CardTitle>Upload MRB minutes and send batch rejection</CardTitle>
          <CardDescription>
            Enter the details below to upload MRB minutes and request batch rejection.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="pt-2">
              <h3 className="text-base font-semibold text-foreground">Physician and Patient Details</h3>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="patientId">Patient ID</Label>
                <Input
                  id="patientId"
                  type="text"
                  placeholder="2X61-600SC"
                  value={values.patientId}
                  onChange={handleChange("patientId")}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="lotId">Lot ID</Label>
                <Input
                  id="lotId"
                  type="text"
                  placeholder="ENR-024760"
                  value={values.lotId}
                  onChange={handleChange("lotId")}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="physicianName">Physician Name</Label>
                <Input
                  id="physicianName"
                  type="text"
                  placeholder="Jean Koff"
                  value={values.physicianName}
                  onChange={handleChange("physicianName")}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="physicianEmail">Physician Email</Label>
                <Input
                  id="physicianEmail"
                  type="text"
                  placeholder="jkoff@emory.edu"
                  value={values.physicianEmail}
                  onChange={handleChange("physicianEmail")}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="initialConsultNotes">Initial Consult Notes</Label>
              <Textarea
                id="initialConsultNotes"
                placeholder="Treating physician decided to consider patient as candidate for Enrolling in EAP - JCAR017 - EAP-001 Cohort 1. Physician anticipates obtaining consent between 10/27/2025 and 11/3/2025."
                value={values.initialConsultNotes}
                onChange={handleChange("initialConsultNotes")}
                rows={4}
              />
            </div>

            <div className="pt-2">
              <h3 className="text-base font-semibold text-foreground">MRB Decision & Recommendation</h3>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="caseId">Case ID</Label>
                <Input
                  id="caseId"
                  type="text"
                  placeholder="ENR-024760"
                  value={values.caseId}
                  onChange={handleChange("caseId")}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="decisionCode">Decision Code</Label>
                <Input
                  id="decisionCode"
                  type="text"
                  placeholder="EAP"
                  value={values.decisionCode}
                  onChange={handleChange("decisionCode")}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Document Upload Completed</Label>
              <RadioGroup
                value={values.documentUploadCompleted}
                onValueChange={handleRadioChange}
                className="flex flex-row gap-6"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="true" id="upload-yes" />
                  <Label htmlFor="upload-yes" className="cursor-pointer font-normal">
                    Yes
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="false" id="upload-no" />
                  <Label htmlFor="upload-no" className="cursor-pointer font-normal">
                    No
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="reason">Reason</Label>
              <Textarea
                id="reason"
                placeholder="Enter reason"
                value={values.reason}
                onChange={handleChange("reason")}
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="consultationNotes">Consultation Notes</Label>
              <Textarea
                id="consultationNotes"
                placeholder="Enter consultation notes"
                value={values.consultationNotes}
                onChange={handleChange("consultationNotes")}
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="mrb-document">Upload MRB Document</Label>
              <input
                id="mrb-document"
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="size-4" />
                Upload MRB Document
              </Button>
            </div>

            <div className="pt-2">
              <h3 className="text-base font-semibold text-foreground">Send request for commercial batch rejection</h3>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="grid gap-2">
                <Label htmlFor="batchNumber">Batch Number</Label>
                <Input
                  id="batchNumber"
                  type="text"
                  placeholder="224456B"
                  value={values.batchNumber}
                  onChange={handleChange("batchNumber")}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="materialCode">Material Code</Label>
                <Input
                  id="materialCode"
                  type="text"
                  placeholder="4075260"
                  value={values.materialCode}
                  onChange={handleChange("materialCode")}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="reasonCode">Reason Code</Label>
                <Input
                  id="reasonCode"
                  type="text"
                  placeholder="MRB SA closed"
                  value={values.reasonCode}
                  onChange={handleChange("reasonCode")}
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
