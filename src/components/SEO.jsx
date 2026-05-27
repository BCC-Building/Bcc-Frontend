// src/components/SEO.jsx - Production-Ready SEO Component
import { Helmet } from 'react-helmet-async';

/**
 * SEO Component
 * Handles all meta tags, Open Graph, Twitter Cards, and structured data
 * 
 * Usage:
 * <SEO 
 *   title="Page Title" 
 *   description="Page description"
 *   url="https://bcc.net.in/page-url"
 *   image="https://bcc.net.in/og-image.jpg"
 *   type="article" (optional, for blog posts)
 * />
 * 
 * Default values are used when props are not provided.
 * All values should be updated per page for best SEO results.
 */

export default function SEO({
  // Basic Meta
  title = 'BCC Building Creators And Consulting | Construction & Engineering Services India',
  description = 'BCC delivers structural engineering, architecture design, soil testing & construction consulting services. 1200+ projects. ISO 9001:2015 certified. Get free consultation.',
  keywords = 'structural engineering services, construction consulting, architecture design, soil investigation testing, material testing services, land survey, NDT testing India',
  
  // URL & Image
  url = 'https://bcc.net.in/',
  image = 'https://bcc.net.in/og-default.jpg',
  
  // Additional
  author = 'BCC Consulting',
  type = 'website',
  publishedDate = '',
  modifiedDate = '',
  tags = [],
  noIndex = false,
  language = 'en-IN',
  twitterHandle = '@bcc_consulting',
  
  // Schema data
  schemaType = 'Organization', // 'Organization', 'LocalBusiness', 'Article', 'BreadcrumbList'
  schemaData = {},
}) {
  
  // Generate full image URL if relative path is provided
  const imageUrl = image.startsWith('http') 
    ? image 
    : `https://bcc.net.in${image.startsWith('/') ? '' : '/'}${image}`;

  // Generate JSON-LD structured data
  const getStructuredData = () => {
    // Organization Schema (Global)
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': 'https://bcc.net.in/#organization',
      name: 'BCC Building Creators And Consulting',
      url: 'https://bcc.net.in',
      logo: 'https://bcc.net.in/logo.png',
      description: 'BCC is an award-winning construction and engineering consulting firm providing structural design, soil investigation, material testing, and project management services across India.',
      foundingDate: '2017',
      founder: {
        '@type': 'Person',
        name: 'Er. Yaseen Ahmad Khan'
      },
      employees: {
        '@type': 'QuantitativeValue',
        value: '50+'
      },
      areaServed: {
        '@type': 'Country',
        name: 'India'
      },
      contact: {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        telephone: '+91-9876543210',
        email: 'info@bcc.net.in'
      },
      sameAs: [
        'https://www.linkedin.com/company/bcc-consulting',
        'https://www.facebook.com/bcc.consulting',
        'https://www.instagram.com/bcc.consulting'
      ],
      image: {
        '@type': 'ImageObject',
        url: 'https://bcc.net.in/og-default.jpg',
        width: 1200,
        height: 630
      }
    };

    // Local Business Schema
    const localBusinessSchema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': 'https://bcc.net.in/#localbusiness',
      name: 'BCC Building Creators And Consulting',
      image: 'https://bcc.net.in/og-default.jpg',
      url: 'https://bcc.net.in',
      telephone: '+91-9876543210',
      priceRange: '₹₹₹',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Plot No. XYZ, Industrial Area',
        addressLocality: 'Rudrapur',
        addressRegion: 'Uttarakhand',
        postalCode: '263153',
        addressCountry: 'IN'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '29.3389',
        longitude: '79.4192'
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '150',
        bestRating: '5'
      }
    };

    // Breadcrumb Schema
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://bcc.net.in'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Services',
          item: 'https://bcc.net.in/services'
        }
      ]
    };

    // Article Schema (for blog posts)
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description: description,
      image: imageUrl,
      datePublished: publishedDate,
      dateModified: modifiedDate || publishedDate,
      author: {
        '@type': 'Person',
        name: author
      },
      publisher: {
        '@type': 'Organization',
        name: 'BCC Consulting',
        logo: {
          '@type': 'ImageObject',
          url: 'https://bcc.net.in/logo.png'
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url
      }
    };

    // Service Schema
    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: title,
      description: description,
      provider: {
        '@type': 'Organization',
        name: 'BCC Building Creators And Consulting',
        url: 'https://bcc.net.in'
      },
      areaServed: {
        '@type': 'Country',
        name: 'India'
      },
      image: imageUrl
    };

    // Return appropriate schema based on type
    if (schemaType === 'Organization') return organizationSchema;
    if (schemaType === 'LocalBusiness') return localBusinessSchema;
    if (schemaType === 'Breadcrumb') return breadcrumbSchema;
    if (schemaType === 'Article') return articleSchema;
    if (schemaType === 'Service') return serviceSchema;
    if (schemaData && Object.keys(schemaData).length > 0) return schemaData;
    
    return {
      '@context': 'https://schema.org',
      '@type': type === 'article' ? 'Article' : 'WebPage',
      name: title,
      description: description,
      url: url,
      image: imageUrl,
    };
  };

  return (
    <Helmet>
      {/* ==================== BASIC META TAGS ==================== */}
      <title>{title}</title>
      <meta name="description" content={description.slice(0, 160)} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'} />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="language" content={language} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />
      <link rel="canonical" href={url} />

      {/* ==================== OPEN GRAPH (Facebook, LinkedIn, Pinterest) ==================== */}
      <meta property="og:title" content={title.slice(0, 60)} />
      <meta property="og:description" content={description.slice(0, 155)} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:site_name" content="BCC Building Creators And Consulting" />
      <meta property="og:locale" content="en_IN" />

      {/* ==================== TWITTER CARD ==================== */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title.slice(0, 60)} />
      <meta name="twitter:description" content={description.slice(0, 155)} />
      <meta name="twitter:image" content={imageUrl} />
      {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}
      {twitterHandle && <meta name="twitter:creator" content={twitterHandle} />}
      <meta name="twitter:domain" content="bcc.net.in" />

      {/* ==================== MOBILE / PWA ==================== */}
      <meta name="theme-color" content="#0f172a" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="BCC Consulting" />
      <meta name="mobile-web-app-capable" content="yes" />

      {/* ==================== ADDITIONAL META TAGS ==================== */}
      <meta name="format-detection" content="telephone=+91-9876543210" />
      <meta name="geo.placename" content="Rudrapur" />
      <meta name="geo.region" content="IN" />

      {/* ==================== JSON-LD STRUCTURED DATA ==================== */}
      <script type="application/ld+json">
        {JSON.stringify(getStructuredData())}
      </script>

      {/* ==================== ALTERNATE LANGUAGES ==================== */}
      <link rel="alternate" hrefLang="en-IN" href={url} />
      <link rel="alternate" hrefLang="en" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />
    </Helmet>
  );
};