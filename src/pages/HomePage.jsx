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

<<<<<<< HEAD
        

        {/* 3. Featured Services */}
        <ServicesPreview />
=======
        {/* 3. Services Preview Section */}
        <section className="py-16 md:py-20" style={{ background: '#f6f4ef' }} aria-labelledby="services-heading">
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
                className="inline-flex items-center gap-2 px-8 py-3.5 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                style={{
                  background: '#111827',
                  color: '#fff',
                  borderRadius: 4,
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  fontSize: 13,
                }}
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
>>>>>>> d315c3a (update navigation and founder experiance)
  

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
