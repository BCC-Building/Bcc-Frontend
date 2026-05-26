import ReusableHeroSection from "../common/ReusableHeroSection";

const TRUST_BADGES = [
  "Quick Answers",
  "Expert Support",
  "Helpful Guidance",
];

const HERO_STATS = [
  { value: "100+", label: "FAQ Topics" },
  { value: "50+", label: "Answered" },
  { value: "24/7", label: "Support" },
];

export default function FAQHero() {
  return (
    <ReusableHeroSection
      eyebrow="Have Questions?"
      title="Frequently Asked Questions"
      subtitle="Find clear answers about BCC services, project processes, timelines, quality standards, and how to start your next project."
      backgroundImage="https://images.unsplash.com/photo-1516534775068-bb57fb94a04e?auto=format&fit=crop&w=1600&q=85&fm=webp"
      primaryCta={{ text: "Browse FAQ", link: "#faq-list" }}
      secondaryCta={{ text: "Contact Support", link: "/contact" }}
      trustBadges={TRUST_BADGES}
      stats={HERO_STATS}
    />
  );
}
