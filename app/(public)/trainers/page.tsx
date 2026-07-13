import { notFound } from "next/navigation";

// Trainer identities are not published on the public site (only the anonymous
// homepage trainers strip remains). The trainer roster stays manageable in the
// admin; restore the old listing from git history if this ever changes.
export default function TrainersPage() {
  notFound();
}
