import type { Metadata } from "next"

import { CvPrintButton } from "@/components/cv-print-button"
import { cv, type CvRole } from "@/lib/cv"

import "./cv.css"

export const metadata: Metadata = {
  title: "Fleur Postma — cv",
  description:
    "Cv van Fleur Postma, grafisch vormgever en contentmaker in Almere. Oprichter van OnceMore.",
}

function Role({ role, project = false }: { role: CvRole; project?: boolean }) {
  return (
    <article className={project ? "cv-entry cv-project" : "cv-entry"}>
      <div className="cv-entry-head">
        <h3 className="cv-entry-title">
          {role.title}
          <span className="cv-entry-org"> · {role.organisation}</span>
        </h3>
        <p className="cv-period">{role.period}</p>
      </div>
      <ul className="cv-points">
        {role.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </article>
  )
}

export default function CvPage() {
  return (
    <main className="cv-stage">
      <div className="cv-chrome">
        <p className="cv-note">
          Eén pagina, één kolom, van nieuw naar oud: profiel, ervaring, overige
          projecten, opleiding en vaardigheden. Geen foto en geen volledig
          huisadres. Anna Speller staat bij overige projecten.
        </p>
        <CvPrintButton />
      </div>

      <article className="cv-sheet">
        <div className="cv-header">
          <div>
            <p className="cv-kicker">Curriculum vitae</p>
            <h1 className="cv-name">{cv.name}</h1>
            <p className="cv-role">{cv.role}</p>
          </div>
          <p className="cv-contact">
            <span>{cv.location}</span>
            <span className="cv-contact-sep" aria-hidden="true">
              ·
            </span>
            <a href={`tel:${cv.phoneHref}`}>{cv.phoneDisplay}</a>
            <span className="cv-contact-sep" aria-hidden="true">
              ·
            </span>
            <a href={`mailto:${cv.email}`}>{cv.email}</a>
            <span className="cv-contact-sep" aria-hidden="true">
              ·
            </span>
            <span>{cv.social}</span>
          </p>
        </div>

        <section className="cv-section" aria-labelledby="profiel">
          <h2 id="profiel">Profiel</h2>
          <p className="cv-profile">{cv.profile}</p>
        </section>

        <section className="cv-section" aria-labelledby="ervaring">
          <h2 id="ervaring">Ervaring</h2>
          {cv.experience.map((role) => (
            <Role key={role.organisation} role={role} />
          ))}
        </section>

        <section className="cv-section" aria-labelledby="projecten">
          <h2 id="projecten">Overige projecten</h2>
          {cv.projects.map((role) => (
            <Role key={role.organisation} role={role} project />
          ))}
        </section>

        <section className="cv-section" aria-labelledby="opleiding">
          <h2 id="opleiding">Opleiding</h2>
          {cv.education.map((item) => (
            <div className="cv-entry" key={item.title}>
              <div className="cv-entry-head">
                <h3 className="cv-entry-title">
                  {item.title}
                  <span className="cv-entry-org"> · {item.organisation}</span>
                </h3>
                <p className="cv-period">{item.period}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="cv-section" aria-labelledby="vaardigheden">
          <h2 id="vaardigheden">Vaardigheden</h2>
          <dl className="cv-facts">
            <div>
              <dt>Ontwerp</dt>
              <dd>{cv.skills.join(", ")}</dd>
            </div>
            <div>
              <dt>Software</dt>
              <dd>{cv.software.join(", ")}</dd>
            </div>
            <div>
              <dt>Talen</dt>
              <dd>{cv.languages.join(", ")}</dd>
            </div>
          </dl>
        </section>
      </article>
    </main>
  )
}
