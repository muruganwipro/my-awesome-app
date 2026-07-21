Add a second form entry under the Workflows page, following the same card/link pattern as the existing "Communicate Conversion Decision to BMS" form.

Technical details

1. New route
   - Create `src/routes/_authenticated/mrb-rejection.tsx`.
   - Route path: `/_authenticated/mrb-rejection` → URL `/mrb-rejection`.
   - Include `head()` metadata: title "Upload MRB minutes and send batch rejection".

2. Workflows page update
   - Add a second boxed link in the Forms section on `src/routes/_authenticated/workflows.tsx`.
   - Label: "Upload MRB minutes and send batch rejection".
   - Icon: document/upload icon (e.g., `FileUp`).
   - Link target: `/mrb-rejection`.

3. Form layout (`mrb-rejection.tsx`)
   - Match the existing conversion-decision form structure: back link, Card with CardHeader/CardContent, responsive grid, section subtitles, Cancel/Submit row.
   - Use `Input`, `Textarea`, `Button`, `Label`, and `RadioGroup`/`RadioGroupItem` from `@/components/ui`.

4. Form fields
   Section title: "Physician and Patient Details"
   - Patient ID — text — placeholder "2X61-600SC"
   - Lot ID — text — placeholder "ENR-024760"
   - Physician Name — text — placeholder "Jean Koff"
   - Physician Email — text — placeholder "jkoff@emory.edu"
   - Initial Consult Notes — textarea — placeholder "Treating physician decided to consider patient as candidate for Enrolling in EAP - JCAR017 - EAP-001 Cohort 1. Physician anticipates obtaining consent between 10/27/2025 and 11/3/2025."

   Section title: "MRB Decision & Recommendation"
   - Case ID — text — placeholder "ENR-024760"
   - Decision Code — text — placeholder "EAP"
   - Document Upload Completed — radio buttons — options Yes/No, default Yes (true)
   - Reason — textarea
   - Consultation Notes — textarea
   - Upload MRB Document — visible button with upload icon that opens a hidden file input

   Section title: "Send request for commercial batch rejection"
   - Batch Number — text — placeholder "224456B"
   - Material Code — text — placeholder "4075260"
   - Reason Code — text — placeholder "MRB SA closed"

5. Buttons
   - Cancel (left, red background) resets the form and shows a toast.
   - Submit (right, with Send icon) logs the payload and shows a success toast, matching the existing form behavior.

6. Validation / behavior
   - Client-side form only; no backend persistence required for this iteration.
   - TypeScript strict build must pass; the new route will be auto-registered by TanStack Router.
