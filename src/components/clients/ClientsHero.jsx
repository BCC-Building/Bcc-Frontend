import ReusableHeroSection from "../common/ReusableHeroSection";

const TRUST_BADGES = [
  "100+ Enterprise Clients",
  "Government & Defence",
  "Corporate Partners",
];

const HERO_STATS = [
  { value: "100+", label: "Clients" },
  { value: "15+", label: "Industries" },
  { value: "500Cr+", label: "Trust Value" },
];

export default function ClientsHero() {
  return (
    <ReusableHeroSection
      eyebrow="Our Partners"
      title="Trusted by Industry Leaders"
      subtitle="Government departments, defence partners, and enterprise clients rely on BCC for dependable construction and consulting delivery."
      backgroundImage="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=85&fm=webp"
      primaryCta={{ text: "View Our Clients", link: "#clients" }}
      secondaryCta={{ text: "Work With Us", link: "/contact" }}
      trustBadges={TRUST_BADGES}
      stats={HERO_STATS}
    />
  );
}
