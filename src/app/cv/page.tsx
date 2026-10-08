import type { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Fleur Postma — cv",
  description:
    "Cv van Fleur Postma, art director en oprichter van Unnown in Almere.",
}

export default function CvPage() {
  redirect("/cv/fleur-postma.html")
}
