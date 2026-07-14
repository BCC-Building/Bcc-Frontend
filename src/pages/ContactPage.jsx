// src/pages/ContactPage.jsx - Production-Ready
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import Contact from '../components/Contact';  


export default function ContactPage() {

  // ==================== STRUCTURED DATA ====================

  /** Organization Schema for Google rich results */
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BCC Building Creators And Consulting',
    url: 'https://bcc.net.in',
    logo: 'https://bcc.net.in/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: import.meta.env.VITE_CONTACT_PHONE || '+91-9876543210',
      contactType: 'customer service',
      availableLanguage: ['English', 'Hindi'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Guru Angad Dev Complex, 4th Floor',
      addressLocality: 'Rudrapur',
      addressRegion: 'Uttarakhand',
      postalCode: '263153',
      addressCountry: 'IN',
    },
    sameAs: [
      'https://www.facebook.com/bccconsulting',
      'https://www.linkedin.com/company/bcc-consulting',
      'https://www.instagram.com/bcc_consulting',
    ],
  };

  /** Breadcrumb Schema */
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://bcc.net.in',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Contact',
        item: 'https://bcc.net.in/contact',
      },
    ],
  };

  return (
    <>
      {/* ==================== SEO ==================== */}
      <SEO
        title="Contact BCC | Get Free Engineering Consultation"
        description="Contact BCC for quotes, consultations & project discussions. Available for structural engineering, architecture, soil testing & construction consulting services."
        keywords="contact BCC, consultation, construction quote, engineering inquiry, project consultation, contact form"
        url="https://bcc.net.in/contact"
        image="https://bcc.net.in/og-contact.jpg"
      />

      {/* ==================== JSON-LD SCHEMA ==================== */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      {/* ==================== MAIN CONTENT ==================== */}
      <main>
        <Contact />
      </main>
    </>
  );
}