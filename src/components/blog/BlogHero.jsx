import ReusableHeroSection from "../common/ReusableHeroSection";

const TRUST_BADGES = [
  "Industry Insights",
  "Expert Articles",
  "Regular Updates",
];

const HERO_STATS = [
  { value: "50+", label: "Articles" },
  { value: "100k+", label: "Monthly Reads" },
  { value: "20+", label: "Topics" },
];

export default function BlogHero() {
  return (
    <ReusableHeroSection
      eyebrow="Our Blog"
      title="Industry Insights & Thought Leadership"
      subtitle="Read practical ideas on construction trends, design decisions, project management, quality control, and engineering execution."
      backgroundImage="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1600&q=85&fm=webp"
      primaryCta={{ text: "Read Articles", link: "#articles" }}
      secondaryCta={{ text: "Subscribe", link: "#subscribe" }}
      trustBadges={TRUST_BADGES}
      stats={HERO_STATS}
    />
  );
}
