import SEO from '../components/SEO';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import ProjectsPreview from '../components/ProjectsPreview';
import PageOverview from '../components/PageOverview';
import WhyChooseBCC from '../components/WhyChooseBCC';
import Experts from '../components/Experts';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';

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
        <AboutSection />
        <ProjectsPreview />
        <PageOverview />
        <WhyChooseBCC />
        <Experts />
       
        <CTA />
      </main>
    </>
  );
}
