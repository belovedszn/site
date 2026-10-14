export const Container = ({ children, className = "" }: { children: React.ReactNode; className?: string }) =>
  <div className={`mx-auto w-full max-w-6xl px-5 ${className}`}>{children}</div>;
export const Section = ({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) =>
  <section id={id} className={`py-20 md:py-28 ${className}`}><Container>{children}</Container></section>;
export const Eyebrow = ({ children }: { children: React.ReactNode }) =>
  <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-jade-600">{children}</p>;
export const Emph = ({ children }: { children: React.ReactNode }) => <em className="not-italic text-jade">{children}</em>;
export const SectionHeading = ({ children }: { children: React.ReactNode }) =>
  <h2 className="font-display text-4xl font-semibold leading-[1.02] tracking-tight md:text-6xl">{children}</h2>;
export const PrimaryButton = ({ href, children }: { href: string; children: React.ReactNode }) =>
  <a href={href} className="group inline-flex items-center gap-2 rounded-full bg-jade px-6 py-3 font-medium text-white transition-colors hover:bg-jade-700">
    {children}<span className="arrow-nudge group-hover:translate-x-1">→</span></a>;
export const SecondaryButton = (p: React.ButtonHTMLAttributes<HTMLButtonElement>) =>
  <button {...p} className="rounded-full border border-white/40 px-6 py-3 font-medium text-white transition-colors hover:bg-white/10" />;
