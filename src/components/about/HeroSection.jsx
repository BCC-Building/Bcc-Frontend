import ReusableHeroSection from "../common/ReusableHeroSection";

const TRUST_BADGES = [
  "ISO 9001:2015 Certified",
  "CIDC Award Winner",
  "Green Certified",
];

const HERO_STATS = [
  { value: "1200+", label: "Projects Completed" },
  { value: "09+", label: "Years Excellence" },
  { value: "98%", label: "Client Satisfaction" },
];

export default function HeroSection() {
  return (
    <ReusableHeroSection
      eyebrow="Building Trust Since 2017"
      title="Engineering, Construction & Consulting With Clarity"
      subtitle="BCC turns complex project requirements into dependable execution across architecture, construction, surveying, testing, and project consulting."
      backgroundImage="https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=85&fm=webp"
      primaryCta={{
        text: "Contact Us",
        link: "/contact",
      }}
      secondaryCta={{
        text: "Explore Services",
        link: "/services",
      }}
      trustBadges={TRUST_BADGES}
      stats={HERO_STATS}
    />
  );
}
