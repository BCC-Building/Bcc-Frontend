import SEO from '../components/SEO';
import Contact from '../components/Contact';

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact BCC Consulting | Start Your Next Project"
        description="Contact BCC for consultations, quotes, and project discussions across construction, consulting, engineering, and surveying services."
        url="https://bcc.example.com/contact"
      />
      <main>
        <Contact />
      </main>
    </>
  );
}
