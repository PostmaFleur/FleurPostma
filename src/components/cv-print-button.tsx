"use client"

export function CvPrintButton() {
  return (
    <button type="button" className="cv-print" onClick={() => window.print()}>
      Print of bewaar als PDF
    </button>
  )
}
