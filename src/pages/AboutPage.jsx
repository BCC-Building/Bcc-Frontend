

import React from "react";
import { motion, useScroll } from "framer-motion";
import SEO from "../components/SEO";

// ── Global styles & utils ────────────────────────────
import GlobalStyles from "../components/about/GlobalStyles";

// ── Section components ───────────────────────────────
import HeroSection         from "../components/about/HeroSection";
import MarqueeStrip        from "../components/about/MarqueeStrip";
import StatsSection        from "../components/about/StatsSection";
import StorySection        from "../components/about/StorySection";
import MissionSection      from "../components/about/MissionSection";
import TimelineSection     from "../components/about/TimelineSection";
import FounderSection      from "../components/about/FounderSection";
import TeamSection         from "../components/about/TeamSection";
import TestimonialsSection from "../components/about/TestimonialsSection";
import CTASection          from "../components/about/CTASection";

export default function AboutPage() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <SEO
        title="About BCC | 1200+ Projects | Expert Engineers Since 2017"
        description="Learn about BCC's journey, mission to deliver excellence in construction consulting, team of expert structural engineers, and ISO certifications."
        keywords="about BCC, construction consulting company, structural engineers, engineering firm, BCC history, founder Yaseen Ahmad Khan"
        url="https://bcc.net.in/about"
        image="https://bcc.net.in/og-about.jpg"
        schemaType="Organization"
      />

      {/* ── Inject global CSS (fonts, utility classes) ── */}
      <GlobalStyles />

      <div className="bcc">
        {/* ── Scroll progress bar (top of viewport) ───── */}
        <motion.div
          className="bcc-prog"
          style={{ scaleX: scrollYProgress }}
        />

        {/* ── Sections in render order ─────────────────── */}
        <HeroSection />
        <MarqueeStrip />
        <StatsSection />
        <StorySection />
        <MissionSection />
        <TimelineSection />
        <FounderSection />
        <TeamSection />
        <TestimonialsSection />
        <CTASection />
      </div>
    </>
  );
}
