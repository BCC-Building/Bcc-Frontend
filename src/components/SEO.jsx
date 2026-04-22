import { Helmet } from 'react-helmet-async';

export default function SEO({
  title = 'BCC Building Creators And Consulting',
  description = 'BCC Consulting delivers architecture design, structural engineering, soil investigation, material testing, and land survey solutions.',
  keywords = 'construction consulting, architecture design, structural engineering, soil investigation, material testing, land survey, NDT testing',
  url = 'https://bcc.net.in/',
  image = 'https://images.unsplash.com/photo-1503387762-592deb58ef4e',
}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="BCC Consulting" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
