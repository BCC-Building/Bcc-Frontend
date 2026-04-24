import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import ProjectsPreview from '../components/ProjectsPreview';
import PageOverview from '../components/PageOverview';
import WhyChooseBCC from '../components/WhyChooseBCC';
import TeamSection from '../components/about/TeamSection';
import TestimonialsSection from '../components/about/TestimonialsSection';
import CTA from '../components/CTA';

// Services Preview Imports
import ServiceCard from '../components/services/ServiceCard';
import SectionHeader from '../components/common/SectionHeader';
import { services } from '../data/ServicesData';

export default function HomePage() {
  return (
    <>
      <SEO
        title="BCC Building Creators And Consulting | Construction & Engineering Services"
        description="BCC delivers structural engineering, architecture, soil investigation, material testing, land survey, and consulting services for ambitious projects."
        url="https://bcc.net.in/"
      />
      <main>
        <Hero />
        <ProjectsPreview />
        
        {/* Services Preview Section - NEW */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <SectionHeader 
              useTailwind={true}
              badge="What We Offer"
              title="Our Professional Services"
              subtitle="Expert engineering and consulting solutions for every project"
            />

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

            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Link 
                to="/services" 
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                View All Services
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </section>
        
        <PageOverview />
        <WhyChooseBCC />
        <TeamSection />
        <TestimonialsSection />
        <CTA />
      </main>
    </>
  );
}