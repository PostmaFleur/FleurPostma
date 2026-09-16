export type Agreement = {
  id: string
  number: string
  title: string
  summary: string
  body: string
  agreed: boolean
}

export type KickoffState = {
  ownerName: string
  partnerName: string
  intro: string
  nextStep: string
  agreements: Agreement[]
}

export const STORAGE_KEY = "opstart-fleur-v1"

export const defaultKickoff: KickoffState = {
  ownerName: "Fleur",
  partnerName: "bouwpartner",
  intro:
    "Fijn dat we starten. Voordat er iets gebouwd wordt: hoe we met elkaar omgaan. Geen handleiding, wel een korte opstart die je kunt bijstellen.\n\nWat hier staat is een voorstel. Zet een vinkje bij wat klopt. Scherp aan wat niet klopt. Jij hebt het laatste woord.",
  nextStep:
    "Als deze afspraken kloppen, is de opstart rond. Daarna het eerste echte stuk werk — jij zegt wat dat is.",
  agreements: [
    {
      id: "taal",
      number: "01",
      title: "Taal en toon",
      summary: "Nederlands, je/jij, kort en helder.",
      body: "We schrijven in het Nederlands. We zeggen je en jij. Zinnen mogen kort zijn. Geen kantoorjargon, geen opvulzinnen.\n\nCode, bestandsnamen en gangbare technische termen blijven in het Engels als dat gebruikelijker is. Als een woord onnodig Engels is, mag het Nederlands.",
      agreed: false,
    },
    {
      id: "richting",
      number: "02",
      title: "Richting eerst",
      summary: "Jij zegt wat je wilt bereiken. Ik maak daar een klein, werkend stuk van.",
      body: "Jij vertelt het doel, niet alleen de knoppen. Ik lever één bruikbaar stuk — geen extra platform, geen features die je niet vroeg.\n\nAls iets te groot wordt, knip ik het in een eerste versie die je al kunt gebruiken. Dan vragen we: is dit de kant op?",
      agreed: false,
    },
    {
      id: "kanalen",
      number: "03",
      title: "Waar we praten",
      summary: "Het werk leeft in dit project. Afspraken staan hier.",
      body: "Het werk zelf loopt via dit project en deze chat. Afspraken die we willen onthouden, komen op deze opstart te staan.\n\nGeen extra tools, mailthreads of losse documenten — tenzij jij dat vraagt. Als iets écht ergens anders thuishoort, zeggen we dat hardop.",
      agreed: false,
    },
    {
      id: "tempo",
      number: "04",
      title: "Tempo",
      summary: "Jij bepaalt het ritme. Geen stille deadlines.",
      body: "We werken asynchroon. Jij checkt in wanneer het uitkomt. Ik lever iets af dat je kunt bekijken, niet een half verhaal.\n\nGeen aannames over wanneer iets af moet, tenzij jij een termijn noemt. Als ik vastloop, zeg ik dat meteen — met wat ik wél al kan laten zien.",
      agreed: false,
    },
    {
      id: "keuzes",
      number: "05",
      title: "Vragen en keuzes",
      summary: "Bij twijfel een verstandige default, en zeggen welke.",
      body: "Als iets onduidelijk is, kies ik een verstandige default en zeg ik welke. Alleen bij échte blokkades vraag ik het terug — scherp, in één vraag.\n\nJij hebt het laatste woord. Ik mag een voorstel doen en kort uitleggen waarom. Als jij iets anders wilt, pas ik aan zonder discussie om de discussie.",
      agreed: false,
    },
    {
      id: "feedback",
      number: "06",
      title: "Feedback",
      summary: "Direct mag. Een paar woorden is genoeg.",
      body: "“Te druk.” “Te lang.” “Niet dit, wél dat.” Dat is genoeg. Ik pas aan zonder in de verdediging te gaan.\n\nAls iets wringt, mag dat vroeg. Liever een korte correctie nu dan een grote omweg later. Complimenten zijn welkom, geen verplichting.",
      agreed: false,
    },
    {
      id: "grenzen",
      number: "07",
      title: "Grenzen",
      summary: "Geen extra’s, geen aannames, geen ruis.",
      body: "Ik voeg niets toe “voor de zekerheid”. Geen lorem ipsum, geen welkomstscherm, geen tweede componentenbibliotheek.\n\nGeen aannames over mensen, merken of data die je niet gaf. Wat gevoelig is, blijft uit de chat tot jij het deelt. Fouten herstel ik zichtbaar.",
      agreed: false,
    },
  ],
}

export function cloneKickoff(state: KickoffState): KickoffState {
  return structuredClone(state)
}

export function agreedCount(state: KickoffState): number {
  return state.agreements.filter((item) => item.agreed).length
}

export function isComplete(state: KickoffState): boolean {
  return (
    state.agreements.length > 0 &&
    state.agreements.every((item) => item.agreed)
  )
}

export function parseKickoff(value: unknown): KickoffState | null {
  if (!value || typeof value !== "object") return null
  const data = value as Partial<KickoffState>
  if (typeof data.ownerName !== "string") return null
  if (typeof data.partnerName !== "string") return null
  if (typeof data.intro !== "string") return null
  if (typeof data.nextStep !== "string") return null
  if (!Array.isArray(data.agreements)) return null

  const agreements: Agreement[] = []
  for (const item of data.agreements) {
    if (!item || typeof item !== "object") return null
    const agreement = item as Partial<Agreement>
    if (typeof agreement.id !== "string") return null
    if (typeof agreement.number !== "string") return null
    if (typeof agreement.title !== "string") return null
    if (typeof agreement.summary !== "string") return null
    if (typeof agreement.body !== "string") return null
    if (typeof agreement.agreed !== "boolean") return null
    agreements.push({
      id: agreement.id,
      number: agreement.number,
      title: agreement.title,
      summary: agreement.summary,
      body: agreement.body,
      agreed: agreement.agreed,
    })
  }

  return {
    ownerName: data.ownerName,
    partnerName: data.partnerName,
    intro: data.intro,
    nextStep: data.nextStep,
    agreements,
  }
}
