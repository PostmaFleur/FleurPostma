"use client"

import { useMemo, useState, useSyncExternalStore } from "react"
import {
  Check,
  CheckCircle2,
  Circle,
  Pencil,
  Printer,
  RotateCcw,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { agreedCount, isComplete, type Agreement, type KickoffState } from "@/lib/kickoff"
import {
  getKickoffServerSnapshot,
  getKickoffSnapshot,
  resetKickoff,
  saveKickoff,
  subscribeKickoff,
} from "@/lib/kickoff-store"
import { cn } from "@/lib/utils"

export function OpstartApp() {
  const snapshot = useSyncExternalStore(
    subscribeKickoff,
    getKickoffSnapshot,
    getKickoffServerSnapshot,
  )
  const { state, corrupt, persisted, savedAt } = snapshot
  const [editingId, setEditingId] = useState<string | null>(null)

  const done = agreedCount(state)
  const total = state.agreements.length
  const complete = isComplete(state)
  const progressLabel = useMemo(() => {
    if (total === 0) return "Nog geen afspraken"
    if (complete) return "Opstart rond"
    return `${done} van ${total} akkoord`
  }, [complete, done, total])

  function setState(updater: (current: KickoffState) => KickoffState) {
    saveKickoff(updater(state))
  }

  function updateAgreement(id: string, patch: Partial<Agreement>) {
    setState((current) => ({
      ...current,
      agreements: current.agreements.map((item) =>
        item.id === id ? { ...item, ...patch } : item,
      ),
    }))
  }

  function agreeAll() {
    setState((current) => ({
      ...current,
      agreements: current.agreements.map((item) => ({
        ...item,
        agreed: true,
      })),
    }))
    setEditingId(null)
  }

  function restoreProposal() {
    resetKickoff()
    setEditingId(null)
  }

  return (
    <div className="flex flex-1 flex-col">
      <header className="print:hidden sticky top-0 z-20 border-b border-foreground/8 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-5 py-3 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="font-heading text-lg tracking-tight">Opstart</span>
            <Badge variant="outline" className="hidden sm:inline-flex">
              {progressLabel}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            {savedAt ? (
              <span className="hidden text-xs text-muted-foreground md:inline">
                Bewaard {savedAt}
              </span>
            ) : persisted ? (
              <span className="hidden text-xs text-muted-foreground md:inline">
                Bewaard in deze browser
              </span>
            ) : null}
            <Button
              variant="ghost"
              size="sm"
              onClick={restoreProposal}
              className="text-muted-foreground"
            >
              <RotateCcw />
              Voorstel
            </Button>
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <Printer />
              Print
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-5xl flex-1 gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_16.5rem] lg:items-start lg:gap-14 lg:py-14">
        <main className="min-w-0">
          {corrupt ? (
            <div className="mb-8 rounded-xl border border-destructive/30 bg-destructive/8 px-4 py-3 text-sm">
              De bewaarde versie was onleesbaar. Hieronder staat het oorspronkelijke
              voorstel. Je kunt gewoon verder.
            </div>
          ) : null}

          <p className="text-sm tracking-[0.18em] text-muted-foreground uppercase">
            Kleine start · hoe we werken
          </p>
          <h1 className="font-heading mt-3 max-w-xl text-[2.35rem] leading-[1.05] font-medium tracking-tight text-balance sm:text-5xl">
            Hallo {state.ownerName}, dit is onze opstart.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Eerst hoe we communiceren. Daarna pas het werk. Alles hier is
            bij te stellen — tik op een afspraak om te scherpen.
          </p>

          <Card className="mt-10 bg-card/80">
            <CardHeader className="border-b">
              <CardTitle className="font-heading text-xl">Wie er aan tafel zit</CardTitle>
              <CardDescription>
                Namen mag je aanpassen. De rest van de tekst volgt vanzelf.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 pt-1 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm">
                <span className="text-muted-foreground">Jij</span>
                <Input
                  value={state.ownerName}
                  onChange={(event) =>
                    setState((current) => ({
                      ...current,
                      ownerName: event.target.value,
                    }))
                  }
                  aria-label="Jouw naam"
                />
              </label>
              <label className="grid gap-1.5 text-sm">
                <span className="text-muted-foreground">Samen met</span>
                <Input
                  value={state.partnerName}
                  onChange={(event) =>
                    setState((current) => ({
                      ...current,
                      partnerName: event.target.value,
                    }))
                  }
                  aria-label="Naam van je bouwpartner"
                />
              </label>
            </CardContent>
            <CardFooter className="bg-transparent">
              <label className="grid w-full gap-1.5 text-sm">
                <span className="text-muted-foreground">Opening</span>
                <Textarea
                  value={state.intro}
                  onChange={(event) =>
                    setState((current) => ({
                      ...current,
                      intro: event.target.value,
                    }))
                  }
                  aria-label="Openingstekst van de opstart"
                  className="min-h-28 leading-relaxed"
                />
              </label>
            </CardFooter>
          </Card>

          {state.agreements.length === 0 ? (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Nog geen afspraken</CardTitle>
                <CardDescription>
                  Het voorstel is leeg. Zet de oorspronkelijke zeven afspraken
                  terug om opnieuw te beginnen.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={restoreProposal}>Voorstel terugzetten</Button>
              </CardContent>
            </Card>
          ) : (
            <ol className="mt-10 grid gap-4">
              {state.agreements.map((agreement) => (
                <li key={agreement.id}>
                  <AgreementCard
                    agreement={agreement}
                    editing={editingId === agreement.id}
                    onToggleEdit={() =>
                      setEditingId((current) =>
                        current === agreement.id ? null : agreement.id,
                      )
                    }
                    onChange={(patch) => updateAgreement(agreement.id, patch)}
                  />
                </li>
              ))}
            </ol>
          )}

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="font-heading text-xl">Als dit klopt</CardTitle>
              <CardDescription>
                De eerste volgende stap, in jullie woorden.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={state.nextStep}
                onChange={(event) =>
                  setState((current) => ({
                    ...current,
                    nextStep: event.target.value,
                  }))
                }
                aria-label="Eerste volgende stap"
                className="min-h-24 leading-relaxed"
              />
            </CardContent>
            <CardFooter className="print:hidden flex-wrap gap-3">
              {complete ? (
                <p className="text-sm leading-relaxed text-pretty">
                  Mooi, {state.ownerName}. De opstart is rond. Zeg maar wat we
                  als eerste bouwen.
                </p>
              ) : (
                <>
                  <Button onClick={agreeAll}>
                    <Check />
                    Dit klopt zo
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Of vink per afspraak aan wat je overneemt.
                  </p>
                </>
              )}
            </CardFooter>
          </Card>
        </main>

        <aside className="print:hidden lg:sticky lg:top-20">
          <div className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
            <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
              Voortgang
            </p>
            <p className="font-heading mt-2 text-3xl tracking-tight">
              {done}/{total}
            </p>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-foreground/10">
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-300"
                style={{ width: total === 0 ? "0%" : `${(done / total) * 100}%` }}
              />
            </div>
            <ul className="mt-5 grid gap-2">
              {state.agreements.map((agreement) => (
                <li key={agreement.id}>
                  <a
                    href={`#afspraak-${agreement.id}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {agreement.agreed ? (
                      <CheckCircle2 className="size-3.5 text-primary" />
                    ) : (
                      <Circle className="size-3.5" />
                    )}
                    <span className="truncate">{agreement.title}</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
              Afspraken blijven in deze browser bewaard. Printen kan als je ze
              ergens anders wilt neerleggen.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}

function AgreementCard({
  agreement,
  editing,
  onToggleEdit,
  onChange,
}: {
  agreement: Agreement
  editing: boolean
  onToggleEdit: () => void
  onChange: (patch: Partial<Agreement>) => void
}) {
  const paragraphs = agreement.body
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean)

  return (
    <Card
      id={`afspraak-${agreement.id}`}
      className={cn(
        "scroll-mt-24",
        agreement.agreed && "bg-[color-mix(in_oklch,var(--card),var(--primary)_6%)]",
      )}
    >
      <CardHeader className="border-b">
        <p className="font-mono text-[0.7rem] tracking-[0.2em] text-muted-foreground">
          {agreement.number}
        </p>
        {editing ? (
          <Input
            value={agreement.title}
            onChange={(event) => onChange({ title: event.target.value })}
            aria-label={`Titel van afspraak ${agreement.number}`}
            className="font-heading h-9 text-base"
          />
        ) : (
          <CardTitle className="font-heading text-xl">{agreement.title}</CardTitle>
        )}
        {editing ? (
          <Input
            value={agreement.summary}
            onChange={(event) => onChange({ summary: event.target.value })}
            aria-label={`Samenvatting van ${agreement.title}`}
          />
        ) : (
          <CardDescription>{agreement.summary}</CardDescription>
        )}
        <CardAction className="print:hidden flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onToggleEdit}
            aria-pressed={editing}
            aria-label={
              editing
                ? `Klaar met bewerken van ${agreement.title}`
                : `Bewerk ${agreement.title}`
            }
          >
            <Pencil />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="pt-1">
        {editing ? (
          <Textarea
            value={agreement.body}
            onChange={(event) => onChange({ body: event.target.value })}
            aria-label={`Tekst van ${agreement.title}`}
            className="min-h-32 leading-relaxed"
          />
        ) : paragraphs.length === 0 ? (
          <p className="text-muted-foreground">Nog geen tekst. Tik op bewerken om te schrijven.</p>
        ) : (
          <div className="grid gap-3 text-[0.95rem] leading-relaxed text-pretty">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="print:hidden justify-between gap-3">
        <label className="flex items-center gap-2 text-sm">
          <Switch
            checked={agreement.agreed}
            onCheckedChange={(checked) => onChange({ agreed: checked })}
            aria-label={`${agreement.title} akkoord`}
          />
          <span>{agreement.agreed ? "Akkoord" : "Voorstel"}</span>
        </label>
        {editing ? (
          <Button variant="outline" size="sm" onClick={onToggleEdit}>
            Klaar
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  )
}
