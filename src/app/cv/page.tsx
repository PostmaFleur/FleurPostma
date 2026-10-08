import type { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Fleur Postma — cv",
  description:
    "Cv van Fleur Postma, grafisch vormgever en contentmaker in Almere. Oprichter van OnceMore.",
}

export default function CvPage() {
  redirect("/cv/fleur-postma.html")
}
