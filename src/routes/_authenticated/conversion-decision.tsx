import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
  consultationNotes: "",
  materialNo: "",
  plant: "",
  customerId: "",
  quantity: "",
  salesOrganization: "",
  distributionChannel: "",
  division: "",
  partyAddress: "",
};

function ConversionDecisionPage() {
  const [values, setValues] = useState(initialValues);

  function handleChange(field: keyof typeof values) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
            </div>

            <div className="grid gap-2">
              <Label htmlFor="consultationNotes">Consultation Notes</Label>
              <Textarea
                id="consultationNotes"
                placeholder="Treating physician decided to consider patient as candidate for Enrolling in EAP - JCAR017 - EAP - 001 Cohort 1. Physician anticipates obtaining patient consent between 10/27/2025 and 11/3/2025"
                value={values.consultationNotes}
                onChange={handleChange("consultationNotes")}
                rows={4}
              />
            </div>

            <div className="pt-2">
              <h3 className="text-base font-semibold text-foreground">Send Request to create Sales order in SAP</h3>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              <div className="grid gap-2">
                <Label htmlFor="materialNo">Material No</Label>
                <Input
                  id="materialNo"
                  type="text"
                  placeholder="4075260"
                  value={values.materialNo}
                  onChange={handleChange("materialNo")}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="plant">Plant</Label>
                <Input
                  id="plant"
                  type="text"
                  placeholder="1000"
                  value={values.plant}
                  onChange={handleChange("plant")}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="customerId">Customer ID</Label>
                <Input
                  id="customerId"
                  type="text"
                  placeholder="40001"
                  value={values.customerId}
                  onChange={handleChange("customerId")}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="text"
                  placeholder="10"
                  value={values.quantity}
                  onChange={handleChange("quantity")}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="salesOrganization">Sales Organization</Label>
              <Input
                id="salesOrganization"
                type="text"
                placeholder="1000"
                value={values.salesOrganization}
                onChange={handleChange("salesOrganization")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="distributionChannel">Distribution Channel</Label>
              <Input
                id="distributionChannel"
                type="text"
                placeholder="10"
                value={values.distributionChannel}
                onChange={handleChange("distributionChannel")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="division">Division</Label>
              <Input
                id="division"
                type="text"
                placeholder="01"
                value={values.division}
                onChange={handleChange("division")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="partyAddress">Party Address</Label>
              <Textarea
                id="partyAddress"
                placeholder="2475 Pinnacle Drive, Wilmington, Delaware"
                value={values.partyAddress}
                onChange={handleChange("partyAddress")}
                rows={3}
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
