import { notFound } from "next/navigation";

// Trainer identities are not published on the public site — see trainers/page.tsx.
export default function TrainerProfilePage() {
  notFound();
}
