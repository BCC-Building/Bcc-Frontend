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
import ServiceCard from '../components/services/ServiceCard';
import SectionHeader from '../components/common/SectionHeader';
import { services } from '../data/ServicesData';
import TeamPage from './TeamPage';
import AboutSection from '../components/about/AboutSection';

/**
 * HomePage Component
 * Main landing page of BCC website
 * 
 * Sections (in order):
 * 1. Hero - Full screen banner with CTA
 * 2. ProjectsPreview - Recent 3 projects
 * 3. Services - 4 featured services
 * 4. PageOverview - Company overview/stats
 * 5. WhyChooseBCC - Unique selling points
 * 6. TeamSection - Featured team members
 * 7. TestimonialsSection - Client reviews
 * 8. CTA - Call to action footer
 * 
 * To reorder sections: Move components up/down
 * To remove a section: Delete the component line
 * To add new section: Add between existing sections
 */
export default function HomePage() {
  return (
    <>
      {/* ==================== SEO ==================== */}
      <SEO
        title="BCC Building Creators And Consulting | Construction & Engineering Services"
        description="BCC delivers structural engineering, architecture, soil investigation, material testing, land survey, and consulting services for ambitious projects across India."
        url="https://bcc.net.in/"
        keywords="construction consulting, architecture design, structural engineering, soil investigation, material testing, land survey, NDT testing, building contractors"
      />

      {/* ==================== MAIN CONTENT ==================== */}
      <main>
        {/* 1. Hero Section */}
        <Hero />

        <AboutSection />  

        {/* 2. Recent Projects Preview */}
        <ProjectsPreview />

        {/* 3. Services Preview Section */}
        <section className="py-16 md:py-20 bg-gray-50" aria-labelledby="services-heading">
          <div className="container mx-auto px-4 md:px-6">
            <SectionHeader
              useTailwind={true}
              badge="What We Offer"
              title="Our Professional Services"
              subtitle="Expert engineering and consulting solutions for every project"
              id="services-heading"
            />

            {/* Services Grid - First 4 services */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {services.slice(0, 4).map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                  variant="home"
                />
              ))}
            </div>

            {/* View All Button */}
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                aria-label="View all services"
              >
                View All Services
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* 4. Company Overview / Stats */}
  

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