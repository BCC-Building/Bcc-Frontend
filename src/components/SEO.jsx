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
  title = 'BCC Building Creators And Consulting',
  description = 'BCC Consulting delivers architecture design, structural engineering, soil investigation, material testing, and land survey solutions.',
  keywords = 'construction consulting, architecture design, structural engineering, soil investigation, material testing, land survey, NDT testing',
  
  // URL & Image
  url = 'https://bcc.net.in/',
  image = 'https://bcc.net.in/og-default.jpg', // 👈 Use your own domain image
  
  // Additional
  author = 'BCC Consulting',
  type = 'website',                // 'website' | 'article' | 'product'
  publishedDate = '',              // For articles: "2024-01-15"
  modifiedDate = '',               // For articles: "2024-01-20"
  tags = [],                       // For articles: ["engineering", "construction"]
  noIndex = false,                 // Set true to hide page from search engines
  language = 'en',
  twitterHandle = '',              // '@bcc_consulting' (optional)
}) {
  
  // Generate full image URL if relative path is provided
  const imageUrl = image.startsWith('http') 
    ? image 
    : `https://bcc.net.in${image.startsWith('/') ? '' : '/'}${image}`;

  // Generate JSON-LD structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'Article' : 'WebPage',
    name: title,
    description: description,
    url: url,
    image: imageUrl,
    ...(type === 'article' && {
      author: {
        '@type': 'Person',
        name: author,
      },
      datePublished: publishedDate,
      dateModified: modifiedDate || publishedDate,
      keywords: tags.join(', '),
    }),
  };

  return (
    <Helmet>
      {/* ==================== BASIC META TAGS ==================== */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="language" content={language} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <link rel="canonical" href={url} />

      {/* ==================== OPEN GRAPH (Facebook, LinkedIn, etc.) ==================== */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="BCC Building Creators And Consulting" />
      <meta property="og:locale" content="en_IN" />

      {/* ==================== TWITTER CARD ==================== */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}
      {twitterHandle && <meta name="twitter:creator" content={twitterHandle} />}

      {/* ==================== MOBILE / PWA ==================== */}
      <meta name="theme-color" content="#0f172a" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="BCC Consulting" />

      {/* ==================== JSON-LD STRUCTURED DATA ==================== */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* ==================== ALTERNATE LANGUAGES (If multi-language) ==================== */}
      <link rel="alternate" hrefLang="en" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />
    </Helmet>
  );
};