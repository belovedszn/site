import { Reveal } from "../Reveal";
import { Section, Eyebrow, SectionHeading, Emph, PrimaryButton, Container } from "../ui";
import { FaqList, CodePanel, ReconcileVisual } from "./Interactive";

export const Accounts = () => (
  <Section id="accounts" className="bg-bone">
    <div className="grid items-center gap-12 md:grid-cols-2">
      <Reveal><Eyebrow>Accounts</Eyebrow>
        <SectionHeading>A virtual account for <Emph>every customer</Emph>.</SectionHeading>
        <p className="mt-6 text-lg text-mid">Customers pay by transfer. Plinth matches every payment to the right invoice automatically, and keeps a running ledger and statements per customer.</p></Reveal>
      <Reveal delay={80}><ReconcileVisual /></Reveal>
    </div>
  </Section>
);

const STEPS = [["Create a plan", "Define price, interval and trial."], ["Subscribe a customer", "Attach a plan and issue their account."], ["Plinth does the rest", "Invoicing, collection, recovery and reconciliation."]];
export const HowItWorks = () => (
  <Section className="bg-bone-200">
    <Reveal><SectionHeading>How it <Emph>works</Emph></SectionHeading></Reveal>
    <ol className="mt-12 grid gap-6 md:grid-cols-3">
      {STEPS.map(([t, d], i) => (
        <Reveal key={t} delay={i * 80}><li className="list-none border-t-2 border-ink pt-4">
          <span className="font-mono text-sm text-jade-600">0{i + 1}</span>
          <h3 className="font-display text-2xl font-semibold">{t}</h3><p className="mt-2 text-mid">{d}</p></li></Reveal>
      ))}
    </ol>
  </Section>
);

export const NigeriaPays = () => (
  <Section className="bg-ink text-white">
    <Reveal><Eyebrow>Nigeria pays</Eyebrow><SectionHeading>Built around how people <Emph>really</Emph> pay.</SectionHeading></Reveal>
    <div className="mt-12 grid gap-6 md:grid-cols-3">
      {[["Transfer-first", "Bank transfers are a first-class payment path, not an afterthought."], ["Recovery", "Failed card charges are retried and followed up automatically."], ["Local rails", "One abstraction over the rails available in Nigeria."]].map(([t, d], i) => (
        <Reveal key={t} delay={i * 80}><div className="rounded-2xl border border-white/10 p-6"><h3 className="font-display text-3xl font-semibold">{t}</h3><p className="mt-2 text-white/70">{d}</p></div></Reveal>
      ))}
    </div>
  </Section>
);

const CASES = [["SaaS", "Seats, tiers and usage-aligned plans."], ["Cooperatives", "Regular member contributions, reconciled."], ["Schools", "Termly fees collected on schedule."], ["Streaming", "Subscriptions with access that follows payment."], ["Home services", "Retainers and recurring visits."]];
export const UseCases = () => (
  <Section>
    <Reveal><SectionHeading>Anywhere revenue <Emph>recurs</Emph></SectionHeading></Reveal>
    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {CASES.map(([t, d], i) => (
        <Reveal key={t} delay={i * 60}><div className="h-full rounded-2xl border border-ink/10 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-jade/50 hover:shadow-lg">
          <h3 className="font-display text-xl font-semibold">{t}</h3><p className="mt-2 text-mid">{d}</p></div></Reveal>
      ))}
    </div>
  </Section>
);

export const Developers = () => (
  <Section id="developers" className="bg-bone-200">
    <div className="grid items-center gap-12 md:grid-cols-2">
      <Reveal><Eyebrow>Developers</Eyebrow><SectionHeading>Ask one question: <Emph>is this customer entitled?</Emph></SectionHeading>
        <p className="mt-6 text-lg text-mid">Gate features on a single entitlements call. Plinth keeps it in sync with payment state.</p></Reveal>
      <Reveal delay={80}><CodePanel /></Reveal>
    </div>
  </Section>
);

export const Trust = () => (
  <Section>
    <Reveal><Eyebrow>Trust</Eyebrow><SectionHeading>Infrastructure you can <Emph>audit</Emph>.</SectionHeading></Reveal>
    <ul className="mt-12 grid gap-4 md:grid-cols-2">
      {["Double-entry ledger", "Idempotent operations", "Automatic reconciliation", "Operational reliability on Nomba rails"].map((t, i) => (
        <Reveal key={t} delay={i * 60}><li className="list-none rounded-2xl border border-ink/10 p-5 font-display text-xl font-semibold">✓ {t}</li></Reveal>
      ))}
    </ul>
  </Section>
);

export const Pricing = () => (
  <Section id="pricing" className="bg-bone-200">
    <Reveal><SectionHeading>Simple <Emph>pricing</Emph></SectionHeading></Reveal>
    <div className="mt-12 grid gap-6 md:grid-cols-3">
      {["Starter", "Growth", "Scale"].map((p, i) => (
        <Reveal key={p} delay={i * 80}><div className="rounded-2xl border border-ink/10 bg-white p-6">
          <h3 className="font-display text-2xl font-semibold">{p}</h3>
          <p className="mt-3 font-mono text-sm text-mid">Pricing to be confirmed</p></div></Reveal>
      ))}
    </div>
  </Section>
);

export const Testimonials = () => (
  <Section>
    <Reveal><SectionHeading>What customers <Emph>say</Emph></SectionHeading></Reveal>
    <div className="mt-12 grid gap-4 md:grid-cols-3">
      {[1, 2, 3].map((n) => <div key={n} className="rounded-2xl border border-dashed border-ink/20 p-6 text-mid">Testimonial placeholder: add a verified quote, name and company.</div>)}
    </div>
  </Section>
);

export const Faq = () => (
  <Section className="bg-bone-200">
    <Reveal><SectionHeading>Questions</SectionHeading></Reveal>
    <div className="mt-10 max-w-3xl">
      <FaqList items={[
        ["How do customers pay?", "By transfer to their own virtual account, or by card. Plinth reconciles both."],
        ["What happens when a payment fails?", "Dunning rules retry and notify the customer, and you see the state in your dashboard."],
        ["Can I gate features on payment status?", "Yes. Use the entitlements endpoint."],
      ]} />
    </div>
  </Section>
);

export const FinalCTA = () => (
  <section className="relative isolate overflow-hidden bg-ink py-28 text-center text-white">
    <div aria-hidden className="aurora absolute left-1/2 top-1/2 -z-10 h-[40rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-jade/20 blur-3xl" />
    <Container><h2 className="font-display text-5xl font-bold uppercase tracking-tight md:text-8xl">Build on <Emph>the base</Emph>.</h2>
      <div className="mt-8"><PrimaryButton href="#developers">Schedule a demo</PrimaryButton></div></Container>
  </section>
);

export const Footer = () => (
  <footer className="bg-ink-900 py-14 text-sm text-white/70">
    <Container>
      <div className="grid gap-8 md:grid-cols-4">
        <div><p className="font-display text-xl font-bold text-white">Plinth</p><p className="mt-2">The base your billing stands on.</p></div>
        {[["Product", ["Subscriptions", "Accounts", "Pricing"]], ["Developers", ["Docs", "API", "Status"]], ["Company", ["About", "Legal", "Contact"]]].map(([h, ls]) => (
          <nav key={h as string} aria-label={h as string}><p className="mb-2 text-white">{h as string}</p>
            <ul className="space-y-1">{(ls as string[]).map((l) => <li key={l}><a href="#" className="hover:text-white">{l}</a></li>)}</ul></nav>
        ))}
      </div>
      <p className="mt-10 border-t border-white/10 pt-6">© Plinth. Regulatory and payment-partner disclosures to be added.</p>
    </Container>
  </footer>
);
