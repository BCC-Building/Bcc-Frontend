import ReusableHeroSection from "../common/ReusableHeroSection";

const TRUST_BADGES = [
  "Industry Awards",
  "Certified Excellence",
  "Recognized Leader",
];

const HERO_STATS = [
  { value: "20+", label: "Awards" },
  { value: "3", label: "Certifications" },
  { value: "98%", label: "Excellence Rate" },
];

export default function AchievementsHero() {
  return (
    <ReusableHeroSection
      eyebrow="Our Recognition"
      title="Awards & Achievements"
      subtitle="Recognition, certifications, and measurable project outcomes reflect the standards BCC brings to construction and consulting work."
      backgroundImage="https://images.unsplash.com/photo-1540575467063-178f50002991?auto=format&fit=crop&w=1600&q=85&fm=webp"
      primaryCta={{ text: "View All Awards", link: "#awards" }}
      secondaryCta={{ text: "Certifications", link: "#certifications" }}
      trustBadges={TRUST_BADGES}
      stats={HERO_STATS}
    />
  );
}
