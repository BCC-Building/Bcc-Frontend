import ReusableHeroSection from "../common/ReusableHeroSection";

const TRUST_BADGES = [
  "500+ Project Photos",
  "High-Quality Imagery",
  "Project Documentation",
];

const HERO_STATS = [
  { value: "500+", label: "Photos" },
  { value: "250+", label: "Projects" },
  { value: "15+", label: "Categories" },
];

export default function GalleryHero() {
  return (
    <ReusableHeroSection
      eyebrow="Visual Portfolio"
      title="Explore Our Project Gallery"
      subtitle="Browse clear project documentation and completed work across construction, interiors, surveying, testing, and engineering services."
      backgroundImage="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=85&fm=webp"
      primaryCta={{ text: "Browse Gallery", link: "#gallery" }}
      secondaryCta={{ text: "View Categories", link: "#categories" }}
      trustBadges={TRUST_BADGES}
      stats={HERO_STATS}
    />
  );
}
