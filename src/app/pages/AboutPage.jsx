import { motion as Motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AppHeader from "../shared/components/AppHeader";

const coreSkills = [
  "React.js",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "MongoDB",
  "AWS / Nginx / PM2",
];

const highlights = [
  {
    title: "Hollyoud.com - Lead Frontend Developer (Bahrain)",
    points: [
      "Led frontend architecture revamp with Next.js + React.",
      "Improved Lighthouse performance from around 40 to 80.",
      "Delivered full-stack + infra ownership across frontend, admin, API, and AWS deployment.",
    ],
  },
  {
    title: "Squatwolf - Senior Frontend Developer (Dubai, Remote)",
    points: [
      "Built eCommerce experiences using Next.js and TypeScript.",
      "Delivered Lighthouse scores above 90 with SSR and caching strategy.",
    ],
  },
  {
    title: "TCS ECOM + Grappetite",
    points: [
      "Developed dashboards, storefronts, and custom JS tools with strong API integration focus.",
      "Hands-on experience across jQuery, Magento, CodeIgniter, and responsive UI foundations.",
    ],
  },
];

export default function AboutPage() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  return (
    <main className="felt-bg min-h-screen px-4 py-5 text-text md:px-6 md:py-7">
      <div className="mx-auto">
        <AppHeader
          shouldReduceMotion={shouldReduceMotion}
          className="mb-5 bg-surface/75"
          rightContent={
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => navigate("/")}
                className="cta-hover cta-hover-soft rounded-btn border border-ivory/30 bg-surface2 px-4 py-2 text-small font-semibold text-ivory"
              >
                Back to Lobby
              </button>
              <button
                onClick={() => navigate("/game")}
                className="cta-hover cta-hover-gold rounded-btn border border-gold/55 bg-gradient-to-b from-gold to-[#c4972f] px-4 py-2 font-semibold text-chip-black"
              >
                Enter Table
              </button>
            </div>
          }
        />

        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Motion.section
            initial={shouldReduceMotion ? false : { opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.26 }}
            className="table-panel overflow-hidden p-5"
          >
            <div className="mx-auto w-full max-w-[280px]">
              <div className="rounded-card border border-gold/40 bg-gradient-to-b from-[#203f32] to-[#11271f] p-2">
                <img
                  src="/images/haroon-nafees.jpg"
                  alt="Muhammad Haroon Nafees"
                  className="h-auto w-full rounded-card object-cover"
                />
              </div>
            </div>

            <div className="mt-5 text-center">
              <p className="text-small uppercase tracking-[0.2em] text-gold">
                Profile
              </p>
              <h1 className="mt-1 text-title font-display text-ivory">
                Muhammad Haroon Nafees
              </h1>
              <p className="mt-2 text-body text-muted">
                Frontend / Full-Stack Engineer
              </p>
              <p className="mt-1 text-small text-muted">Bahrain • MENA Region</p>

              <a
                href="https://www.linkedin.com/in/haroon-nafees"
                target="_blank"
                rel="noreferrer"
                className="cta-hover cta-hover-soft mt-4 inline-flex rounded-btn border border-ivory/30 bg-surface2 px-4 py-2 text-small font-semibold text-ivory"
              >
                LinkedIn Profile
              </a>
            </div>

            <div className="mt-5 rounded-card border border-border/60 bg-surface2/70 p-4">
              <p className="text-small uppercase tracking-[0.16em] text-gold">
                Summary
              </p>
              <p className="mt-2 text-body text-muted">
                Frontend Engineer with 9+ years of experience building scalable
                web applications with React, Next.js, TypeScript, and Tailwind.
                Strong in architecture, performance, API integration, and
                production deployment workflows.
              </p>
            </div>
          </Motion.section>

          <Motion.section
            initial={shouldReduceMotion ? false : { opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.26, delay: 0.04 }}
            className="space-y-5"
          >
            <div className="table-panel p-5">
              <p className="text-small uppercase tracking-[0.18em] text-gold">
                Core Stack
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {coreSkills.map((skill) => (
                  <span
                    key={skill}
                    className="chip-badge chip-badge-win bg-gold/90 px-3 py-1 text-small"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="table-panel p-5">
              <p className="text-small uppercase tracking-[0.18em] text-gold">
                Experience Highlights
              </p>
              <div className="mt-4 space-y-3">
                {highlights.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-card border border-border/60 bg-surface2/65 p-4"
                  >
                    <h2 className="font-display text-section text-ivory">
                      {item.title}
                    </h2>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-body text-muted">
                      {item.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="table-panel p-5">
              <p className="text-small uppercase tracking-[0.18em] text-gold">
                Education
              </p>
              <p className="mt-2 text-body text-muted">
                BS in Computer Science, Bahria University (2011 - 2015)
              </p>
            </div>
          </Motion.section>
        </div>
      </div>
    </main>
  );
}
