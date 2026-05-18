

import React from "react";
import { motion, useScroll } from "framer-motion";

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
