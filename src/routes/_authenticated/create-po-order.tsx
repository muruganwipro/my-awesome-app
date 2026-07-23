import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/_authenticated/create-po-order")({
  head: () => ({
    meta: [
      { title: "Review Sales order result and Create PO Order" },
      { name: "description", content: "Review the SAP sales order response and request an OOS process order." },
      { property: "og:title", content: "Review Sales order result and Create PO Order" },
      { property: "og:description", content: "Review the SAP sales order response and request an OOS process order." },
    ],
  }),
  component: CreatePoOrderPage,
});

const initialValues = {
  patientId: "",
  enrollmentId: "",
  lotId: "",
  physicianId: "",
  physicianName: "",
  physicianEmail: "",
  consultNotes: "",
  oosOrderId: "",
  orderDate: "",
  orderStatus: "",
  unitOfMeasure: "",
  materialNo: "",
  plant: "",
  salesOrderNumber: "",
};

function CreatePoOrderPage() {
  const [values, setValues] = useState(initialValues);

  function handleChange(field: keyof typeof values) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    toast.success("PO order creation request submitted.");
    console.log("Create PO order payload:", values);
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
          <CardTitle>Review Sales order result and Create PO Order</CardTitle>
          <CardDescription>
            Review the OOS sales order response and submit the process order creation request.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="pt-2">
              <h3 className="text-base font-semibold text-foreground">Physician and Patient Information</h3>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="grid gap-2">
                <Label htmlFor="physicianId">Physician ID</Label>
                <Input
                  id="physicianId"
                  type="text"
                  value={values.physicianId}
                  onChange={handleChange("physicianId")}
                />
              </div>

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
              <Label htmlFor="consultNotes">Consult Notes</Label>
              <Textarea
                id="consultNotes"
                placeholder="Treating physician decided to consider patient as candidate for Enrolling in EAP - JCAR017 - EAP-001 Cohort 1. Physician anticipates obtaining consent between 10/27/2025 and 11/3/2025."
                value={values.consultNotes}
                onChange={handleChange("consultNotes")}
                rows={4}
              />
            </div>

            <div className="pt-2">
              <h3 className="text-base font-semibold text-foreground">OOS Sales Order Response from SAP</h3>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="grid gap-2">
                <Label htmlFor="oosOrderId">OOS Order ID</Label>
                <Input
                  id="oosOrderId"
                  type="text"
                  placeholder="70001234"
                  value={values.oosOrderId}
                  onChange={handleChange("oosOrderId")}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="orderDate">Order Date</Label>
                <Input
                  id="orderDate"
                  type="text"
                  placeholder="2026-07-05"
                  value={values.orderDate}
                  onChange={handleChange("orderDate")}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="orderStatus">Order Status</Label>
                <Input
                  id="orderStatus"
                  type="text"
                  placeholder="CREATED"
                  value={values.orderStatus}
                  onChange={handleChange("orderStatus")}
                />
              </div>
            </div>

            <div className="pt-2">
              <h3 className="text-base font-semibold text-foreground">Send Request to Create OOS Process Order</h3>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              <div className="grid gap-2">
                <Label htmlFor="unitOfMeasure">Unit Of Measure</Label>
                <Input
                  id="unitOfMeasure"
                  type="text"
                  placeholder="ml"
                  value={values.unitOfMeasure}
                  onChange={handleChange("unitOfMeasure")}
                />
              </div>

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
                <Label htmlFor="salesOrderNumber">Sales Order Number</Label>
                <Input
                  id="salesOrderNumber"
                  type="text"
                  placeholder="5000001234"
                  value={values.salesOrderNumber}
                  onChange={handleChange("salesOrderNumber")}
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
