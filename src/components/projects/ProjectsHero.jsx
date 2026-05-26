import ReusableHeroSection from "../common/ReusableHeroSection";

const TRUST_BADGES = [
  "1200+ Completed Projects",
  "9+ Years Excellence",
  "98% Client Satisfaction",
];

const HERO_STATS = [
  { value: "1200+", label: "Projects" },
  { value: "500Cr+", label: "Portfolio Value" },
  { value: "98%", label: "On-Time Delivery" },
];

export default function ProjectsHero() {
  return (
    <ReusableHeroSection
      eyebrow="Our Portfolio"
      title="Landmark Projects That Define Excellence"
      subtitle="Explore residential, commercial, infrastructure, and industrial work delivered with strong planning, sharp execution, and consistent site quality."
      backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85&fm=webp"
      primaryCta={{ text: "Explore Projects", link: "#projects" }}
      secondaryCta={{ text: "Start Your Project", link: "/contact" }}
      trustBadges={TRUST_BADGES}
      stats={HERO_STATS}
    />
  );
}
