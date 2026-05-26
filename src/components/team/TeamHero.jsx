import ReusableHeroSection from "../common/ReusableHeroSection";

const TRUST_BADGES = [
  "40+ Expert Professionals",
  "Diverse Expertise",
  "Industry Veterans",
];

const HERO_STATS = [
  { value: "40+", label: "Team Members" },
  { value: "15+", label: "Specializations" },
  { value: "200+", label: "Combined Experience" },
];

export default function TeamHero() {
  return (
    <ReusableHeroSection
      eyebrow="Meet Our Team"
      title="Expert Professionals Driving Excellence"
      subtitle="Our architects, engineers, surveyors, and project specialists bring practical field experience and careful coordination to every assignment."
      backgroundImage="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=85&fm=webp"
      primaryCta={{ text: "Explore Team", link: "#team-members" }}
      secondaryCta={{ text: "Join Our Team", link: "/careers" }}
      trustBadges={TRUST_BADGES}
      stats={HERO_STATS}
    />
  );
}
