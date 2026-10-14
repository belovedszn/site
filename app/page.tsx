import Hero from "@/components/Hero";
import Subscriptions from "@/components/sections/Subscriptions";
import { Accounts, HowItWorks, NigeriaPays, UseCases, Developers, Trust, Pricing, Testimonials, Faq, FinalCTA, Footer } from "@/components/sections/Lower";
export default function Page() {
  return (
    <main>
      <Hero /><Subscriptions /><Accounts /><HowItWorks /><NigeriaPays /><UseCases />
      <Developers /><Trust /><Pricing /><Testimonials /><Faq /><FinalCTA /><Footer />
    </main>
  );
}
