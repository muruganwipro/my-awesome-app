import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/_authenticated/conversion-decision")({
  head: () => ({
    meta: [
      { title: "Communicate Conversion Decision to BMS" },
      { name: "description", content: "Send the conversion decision details to BMS." },
      { property: "og:title", content: "Communicate Conversion Decision to BMS" },
      { property: "og:description", content: "Send the conversion decision details to BMS." },
    ],
  }),
  component: ConversionDecisionPage,
});

const initialValues = {
  batchId: "",
  patientId: "",
  enrollmentId: "",
  physicianName: "",
  alternatePhysicianName: "",
  physicianEmail: "",
  lotType: "",
};

function ConversionDecisionPage() {
  const [values, setValues] = useState(initialValues);

  function handleChange(field: keyof typeof values) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    toast.success("Conversion decision form submitted.");
    console.log("Conversion decision payload:", values);
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
          <CardTitle>Communicate Conversion Decision to BMS</CardTitle>
          <CardDescription>
            Enter the details below to notify BMS of the conversion decision.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid gap-2">
              <Label htmlFor="batchId">Batch ID</Label>
              <Input
                id="batchId"
                type="text"
                placeholder="224456A"
                value={values.batchId}
                onChange={handleChange("batchId")}
              />
            </div>

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
              <Label htmlFor="enrollmentId">Enrollment ID</Label>
              <Input
                id="enrollmentId"
                type="text"
                placeholder="ENR-024760"
                value={values.enrollmentId}
                onChange={handleChange("enrollmentId")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="physicianName">Physician Name</Label>
              <Input
                id="physicianName"
                type="text"
                placeholder="Pamela Blair Allen, MD, MSc"
                value={values.physicianName}
                onChange={handleChange("physicianName")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="alternatePhysicianName">Alternate Physician Name</Label>
              <Input
                id="alternatePhysicianName"
                type="text"
                placeholder="Jean Koff"
                value={values.alternatePhysicianName}
                onChange={handleChange("alternatePhysicianName")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="physicianEmail">Physician Email</Label>
              <Input
                id="physicianEmail"
                type="email"
                placeholder="jkoff@emory.edu"
                value={values.physicianEmail}
                onChange={handleChange("physicianEmail")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="lotType">Lot Type</Label>
              <Input
                id="lotType"
                type="text"
                placeholder="EAP"
                value={values.lotType}
                onChange={handleChange("lotType")}
              />
            </div>

            <Button type="submit" className="mt-2 w-full sm:w-auto">
              <Send className="size-4" />
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
