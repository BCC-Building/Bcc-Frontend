// src/pages/HomePage.jsx - Production-Ready Home Page
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import ProjectsPreview from '../components/ProjectsPreview';
import PageOverview from '../components/PageOverview';
import WhyChooseBCC from '../components/WhyChooseBCC';
import TestimonialsSection from '../components/about/TestimonialsSection';
import TeamSection from '../components/about/TeamSection';
import CTA from '../components/CTA';

// Services Preview
import { services } from "../data/servicesData.js";
import ServicesPreview from '../components/ServicesPreview';
import TeamPage from './TeamPage';
import AboutSection from '../components/about/AboutSection';

export default function HomePage() {
  return (
    <>
      {/* ==================== SEO ==================== */}
      <SEO
        title="BCC Consulting | Structural Engineering & Construction Services"
        description="BCC delivers structural engineering, architecture design, soil testing & construction consulting. 1200+ projects completed. ISO 9001:2015 certified. Free consultation."
        keywords="structural engineering services India, construction consulting, architecture design, soil investigation, material testing, NDT testing, engineering services Rudrapur"
        url="https://bcc.net.in/"
        image="https://bcc.net.in/og-home.jpg"
        schemaType="LocalBusiness"
      />

      {/* ==================== MAIN CONTENT ==================== */}
      <main>
        {/* 1. Hero Section */}
        <Hero />

        <AboutSection />  

        {/* 2. Recent Projects Preview */}
        <ProjectsPreview />

        

        {/* 3. Featured Services */}
        <ServicesPreview />
  

        {/* 5. Why Choose BCC */}
        <WhyChooseBCC />

        {/* 6. Featured Team Members */}
        <TeamSection />

        {/* 7. Client Testimonials */}
        <TestimonialsSection />

        {/* 8. Call to Action */}
        <CTA />
      </main>
    </>
  );
}