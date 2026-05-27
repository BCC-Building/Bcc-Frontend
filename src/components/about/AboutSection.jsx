// AboutSection.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

const stats = [
  {
    number: '10+',
    label: 'State Served',
    items: ['UttraKhand', 'Uttar Pradesh', 'Delhi', 'Rajasthan', 'Punjab', 'Haryana', 'Nagaland', 'Shimla', 'Arunachal Pradesh', 'Jammu & Kashmir'],
  },
  { number: '1200+', label: 'Projects Completed' },
  { number: '09+', label: 'Years of Experience' },
  { number: '50+', label: 'Million sq ft', sub: 'under Green Certification' },
];

const AboutSection = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Building Creators and Consulting',
    description: 'Building Creators and Consulting is a comprehensive building design and consulting firm.',
    foundingDate: '2017',
    founder: { '@type': 'Person', name: 'Er. Yaseen Ahmad Khan' },
  };

  return (
    <>
      <Helmet>
        <title>About Us - Building Creators and Consulting</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <meta
          name="description"
          content="Building Creators and Consulting delivers Architecture, Structural Engineering, Interior Design, Soil Investigation, Material Testing and Consultancy Services."
        />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

        <style>{`
          .about-bcc * { box-sizing: border-box; }

          .about-bcc {
            background: #ffffff;
            font-family: 'Jost', sans-serif;
            color: #1c1c1c;
            border-top: 3px solid #c8864a;
          }

          .about-top {
            display: grid;
            grid-template-columns: 220px 1fr 320px;
            gap: 0;
            padding: 64px 56px 52px;
            max-width: 1280px;
            margin: 0 auto;
          }

          .about-title-col { padding-right: 36px; }

          .about-label {
            font-family: 'Cormorant Garamond', serif;
            font-size: 12px;
            font-weight: 400;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: #aaa;
            margin: 0 0 8px;
          }
          .about-title {
            font-family: 'Cormorant Garamond', serif;
            font-size: clamp(1.9rem, 2.8vw, 2.7rem);
            font-weight: 400;
            line-height: 1.18;
            color: #c8864a;
            margin: 0;
            font-style: italic;
          }

          .about-body-col {
            padding: 0 40px;
            border-left: 1px solid #ebebeb;
          }
          .about-body-col p {
            font-family: 'Jost', sans-serif;
            font-size: 15px;
            font-weight: 300;
            line-height: 1.9;
            color: #3a3a3a;
            margin: 0 0 1.35em;
          }
          .about-body-col p:last-child { margin-bottom: 0; }
          .about-body-col strong { font-weight: 500; color: #1c1c1c; }

          .about-quote-col { padding-left: 32px; }

          .quote-card-bcc {
            background: #f5ede2;
            padding: 26px 26px 22px;
            height: 100%;
          }
          .quote-award {
            font-family: 'Jost', sans-serif;
            font-size: 11.5px;
            font-weight: 300;
            color: #888;
            line-height: 1.65;
            text-align: center;
            padding-bottom: 16px;
            margin-bottom: 16px;
            border-bottom: 1px solid rgba(0,0,0,0.08);
          }
          .quote-marks {
            font-family: Georgia, serif;
            font-size: 68px;
            line-height: 0.55;
            color: #d4b896;
            display: block;
            margin-bottom: 14px;
          }
          .quote-text {
            font-family: 'Cormorant Garamond', serif;
            font-size: clamp(1.25rem, 1.7vw, 1.6rem);
            font-weight: 400;
            line-height: 1.45;
            color: #1c1c1c;
            margin: 0 0 14px;
          }
          .quote-cite {
            font-family: 'Jost', sans-serif;
            font-size: 11.5px;
            font-weight: 300;
            color: #999;
            letter-spacing: 0.05em;
          }

          .about-stats {
            border-top: 1px solid #e8e8e8;
            max-width: 1280px;
            margin: 0 auto;
            padding: 44px 56px 56px;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
          }

          .stat-item {
            padding-right: 28px;
            margin-right: 28px;
            border-right: 1px solid #e8e8e8;
          }
          .stat-item:last-child {
            border-right: none;
            padding-right: 0;
            margin-right: 0;
          }

          .stat-number-bcc {
            font-family: 'Cormorant Garamond', serif;
            font-size: clamp(2.8rem, 4vw, 4.2rem);
            font-weight: 300;
            line-height: 1;
            color: #1c1c1c;
            letter-spacing: -0.02em;
            display: block;
          }
          .stat-label-bcc {
            font-family: 'Jost', sans-serif;
            font-size: clamp(0.95rem, 1.3vw, 1.2rem);
            font-weight: 300;
            color: #1c1c1c;
            display: block;
            margin-top: 5px;
          }
          .stat-sub-bcc {
            font-family: 'Jost', sans-serif;
            font-size: 12px;
            font-weight: 300;
            color: #999;
            display: block;
            margin-top: 4px;
            line-height: 1.5;
          }
          .stat-countries {
            margin-top: 10px;
            display: flex;
            flex-direction: column;
            gap: 1px;
          }
          .stat-countries span {
            font-family: 'Jost', sans-serif;
            font-size: 12.5px;
            font-weight: 300;
            color: #777;
            line-height: 1.75;
          }

          .about-cta {
            border-top: 1px solid #e8e8e8;
            max-width: 1280px;
            margin: 0 auto;
            padding: 32px 56px 56px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 2rem;
          }
          .cta-text {
            font-family: 'Cormorant Garamond', serif;
            font-size: clamp(1.35rem, 2vw, 1.8rem);
            font-weight: 400;
            color: #1c1c1c;
            line-height: 1.4;
            margin: 0;
          }
          .cta-text em { font-style: italic; color: #c8864a; }

          .cta-btn-bcc {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            font-family: 'Jost', sans-serif;
            font-size: 11px;
            font-weight: 400;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            color: #1c1c1c;
            text-decoration: none;
            padding: 14px 30px;
            border: 1px solid #1c1c1c;
            transition: background 0.3s ease, color 0.3s ease;
            white-space: nowrap;
            flex-shrink: 0;
          }
          .cta-btn-bcc:hover { background: #1c1c1c; color: #fff; }
          .cta-btn-bcc svg { transition: transform 0.3s ease; }
          .cta-btn-bcc:hover svg { transform: translateX(4px); }

          @media (max-width: 960px) {
            .about-top {
              grid-template-columns: 1fr;
              padding: 40px 24px 36px;
              gap: 2rem;
            }
            .about-title-col { padding-right: 0; }
            .about-body-col { border-left: none; border-top: 1px solid #ebebeb; padding: 1.5rem 0 0; }
            .about-quote-col { padding-left: 0; }
            .quote-card-bcc { height: auto; }
            .about-stats { grid-template-columns: 1fr 1fr; padding: 36px 24px 40px; gap: 2rem 0; }
            .stat-item { border-right: none; padding-right: 0; margin-right: 0; }
            .about-cta { flex-direction: column; align-items: flex-start; padding: 28px 24px 40px; }
          }
        `}</style>
      </Helmet>

      <section className="about-bcc">

        {/* ── TOP 3-COLUMN ── */}
        <div className="about-top">

          {/* LEFT */}
          <div className="about-title-col">
            <p className="about-label">About</p>
            <h2 className="about-title">
              Building<br />
              Creators &amp;<br />
              Consulting
            </h2>
          </div>

          {/* CENTER */}
          <div className="about-body-col">
            <p>
              Established in <strong>2017</strong> by <strong>Er. Yaseen Ahmad Khan</strong>,
              Building Creators and Consulting is a multidisciplinary architectural and
              engineering consultancy delivering innovative, sustainable, and technically
              advanced solutions across India and beyond.
            </p>
            <p>
              Our expertise spans Architecture, Structural Engineering, Interior Design,
              Soil Investigation, Material Testing, Surveying, Bridge Design, Water Supply
              Design, Irrigation Planning, and Project Supervision — ensuring complete
              project execution under one roof.
            </p>
            <p>
              With a growing portfolio across <strong>10+ states</strong>, <strong>1200+ projects</strong>,
              and <strong>09+ years</strong>, we bring functionality, precision, durability,
              and modern aesthetics to every project — from residential homes to large-scale
              infrastructure. Every project reflects our commitment to quality engineering
              and long-term value creation.
            </p>
          </div>

          {/* RIGHT */}
          <div className="about-quote-col">
            <div className="quote-card-bcc">
              <p className="quote-award">
                National Award for Outstanding<br />
                Engineering &amp; Architectural Excellence
              </p>
              <span className="quote-marks">"</span>
              <p className="quote-text">
                Building Creators and Consulting transforms ideas into sustainable
                architectural excellence.
              </p>
              <p className="quote-cite">— Vision Statement</p>
            </div>
          </div>

        </div>

        {/* ── STATS ── */}
        <div className="about-stats">
          {stats.map((item, index) => (
            <div className="stat-item" key={index}>
              <span className="stat-number-bcc">{item.number}</span>
              <span className="stat-label-bcc">{item.label}</span>
              {item.sub && <span className="stat-sub-bcc">{item.sub}</span>}
              {item.items && (
                <div className="stat-countries">
                  {item.items.map((c, i) => <span key={i}>{c}</span>)}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="about-cta">
          <p className="cta-text">
            Let's Build Something <em>Remarkable Together</em> —<br />
            from concept to completion, with precision and trust.
          </p>
          <a href="/contact" className="cta-btn-bcc">
            Contact Us
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

      </section>
    </>
  );
};

export default AboutSection;