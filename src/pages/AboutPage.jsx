import SEO from '../components/SEO';
import AboutSection from '../components/AboutSection';

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About BCC Consulting | Industry-Leading Construction & Consulting"
        description="Learn about BCC's mission, vision, values, expert team and core services in construction, consulting and IT solutions."
        url="https://bcc.example.com/about"
      />
      <main>
        <AboutSection />
      </main>
    </>
  );
}
