import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useScroll } from 'framer-motion';

// Components

import CustomCursor from '../components/common/CustomCursor';
import ProgressBar from '../components/common/ProgressBar';
import HeroSection from '../components/about/HeroSection';
import StatsSection from '../components/about/StatsSection';
import StorySection from '../components/about/StorySection';
import MissionSection from '../components/about/MissionSection';
import TimelineSection from '../components/about/TimelineSection';
import TeamSection from '../components/about/TeamSection';
import TestimonialsSection from '../components/about/TestimonialsSection';
import FounderSection from '../components/about/FounderSection';
import CTASection from '../components/about/CTASection';

// Styles
import '../styles/about.css';

const AboutPage = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  return (
    <>
      <Helmet>
        <title>BCC | India's Premier Construction & Consulting Company | 15+ Years Excellence</title>
        <meta name="description" content="BCC is India's leading construction and consulting firm with 250+ successful projects, ISO certification, and 100% client satisfaction. Building India's future since 2010." />
        <meta name="keywords" content="BCC, Building Creators, construction company India, consulting services, soil investigation" />
        <link rel="canonical" href="https://www.bccindia.com/about" />
        
        <meta property="og:title" content="BCC - Building India's Future Since 2010" />
        <meta property="og:description" content="India's most trusted construction partner with 250+ successful projects." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.bccindia.com/about" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BCC - Excellence in Construction & Consulting" />
        <meta name="twitter:description" content="Building India's landmarks with quality and integrity." />
      </Helmet>

      <CustomCursor />
      <ProgressBar targetRef={heroRef} />

      <HeroSection heroRef={heroRef} scrollYProgress={scrollYProgress} />
      <StatsSection />
      <StorySection />
      <MissionSection />
      <TimelineSection />
      <TeamSection />
      <TestimonialsSection />
      <FounderSection />
      <CTASection />
    </>
  );
};

export default AboutPage;