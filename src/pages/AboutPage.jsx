/**
 * AboutPage
 * ──────────
 * Assembles all section components into the final About page.
 *
 * FOLDER STRUCTURE expected:
 *   src/
 *   ├── pages/
 *   │   └── AboutPage.jsx           ← this file
 *   ├── components/about/
 *   │   ├── GlobalStyles.jsx
 *   │   ├── Shared.jsx
 *   │   ├── HeroSection.jsx
 *   │   ├── MarqueeStrip.jsx
 *   │   ├── StatsSection.jsx
 *   │   ├── StorySection.jsx
 *   │   ├── MissionSection.jsx
 *   │   ├── TimelineSection.jsx
 *   │   ├── FounderSection.jsx
 *   │   ├── TeamSection.jsx
 *   │   ├── TestimonialsSection.jsx
 *   │   └── CTASection.jsx
 *   ├── data/
 *   │   └── aboutData.js
 *   └── utils/
 *       └── tokens.js
 *
 * ── HOW TO REUSE SECTIONS ON OTHER PAGES ──────────────
 *
 *   // e.g. on your Home page show just Stats + Team + CTA:
 *   import StatsSection       from "../components/about/StatsSection";
 *   import TeamSection        from "../components/about/TeamSection";
 *   import CTASection         from "../components/about/CTASection";
 *   import GlobalStyles       from "../components/about/GlobalStyles";
 *
 *   export default function HomePage() {
 *     return (
 *       <>
 *         <GlobalStyles />          // inject once per page
 *         <div className="bcc">
 *           <StatsSection />
 *           <TeamSection featuredCount={3} />
 *           <CTASection />
 *         </div>
 *       </>
 *     );
 *   }
 *
 * ── LIVE API FOR TEAM ─────────────────────────────────
 *
 *   const [team, setTeam]         = useState([]);
 *   const [loading, setLoading]   = useState(true);
 *   useEffect(() => {
 *     publicAPI.getActiveTeamMembers()
 *       .then(r => setTeam(r.data.data))
 *       .finally(() => setLoading(false));
 *   }, []);
 *   <TeamSection team={team} isLoading={loading} />
 *
 * ── SEO ───────────────────────────────────────────────
 *   Wrap this page with your Helmet/Head component:
 *   <Helmet>
 *     <title>About BCC — Building Creators & Consulting</title>
 *     <meta name="description" content="Learn about BCC India's journey, mission, and expert team delivering 250+ construction projects across 15+ cities since 2010." />
 *   </Helmet>
 */

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
