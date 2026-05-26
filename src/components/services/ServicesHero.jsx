import ReusableHeroSection from "../common/ReusableHeroSection";

const TRUST_BADGES = [
  "ISO 9001:2015 Certified",
  "NABL Accredited Lab",
  "100% Client Satisfaction",
];

export default function ServicesHero({ totalServices = 14 }) {
  const stats = [
    { value: `${totalServices}+`, label: "Services" },
    { value: "1200+", label: "Projects" },
    { value: "98%", label: "Satisfaction" },
  ];

  return (
    <ReusableHeroSection
      eyebrow="Trusted Since 2017"
      title="Engineering Excellence That Builds Tomorrow"
      subtitle={`From concept to completion, BCC delivers ${totalServices}+ engineering, construction, consulting, surveying, and testing services with clear communication and dependable quality.`}
      backgroundImage="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=85&fm=webp"
      primaryCta={{ text: "Start Your Project", link: "/contact" }}
      secondaryCta={{ text: "View Portfolio", link: "/projects" }}
      trustBadges={TRUST_BADGES}
      stats={stats}
    />
  );
}
