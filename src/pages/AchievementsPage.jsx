// src/pages/AchievementsPage.jsx
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

// ==================== DATA ====================

/**
 * Achievement Categories with items
 * Each item has: icon (emoji), title, description, year
 */
const ACHIEVEMENT_CATEGORIES = [
  {
    id: 'awards',
    title: 'Awards & Recognitions',
    icon: '🏆',
    items: [
      {
        icon: '🥇',
        title: 'Best Construction & Consulting Firm 2024',
        desc: 'Awarded by Uttarakhand Business Excellence Forum for outstanding project delivery and client satisfaction.',
        year: '2024',
      },
      {
        icon: '🌟',
        title: 'Emerging Infrastructure Partner',
        desc: 'Recognised by India Infrastructure Awards for contributions in defence and government projects.',
        year: '2023',
      },
      {
        icon: '🎖️',
        title: 'Quality Excellence Award',
        desc: 'Received from PWD Uttarakhand for consistent quality standards in road construction.',
        year: '2022',
      },
    ],
  },
  {
    id: 'certifications',
    title: 'Certifications & Accreditations',
    icon: '📜',
    items: [
      {
        icon: '✅',
        title: 'ISO 9001:2015 Certified',
        desc: 'Quality Management System certified by TÜV SÜD for construction and consulting services.',
        year: '2019',
      },
      {
        icon: '🛡️',
        title: 'ISO 14001:2015 Certified',
        desc: 'Environmental Management System certification for sustainable construction practices.',
        year: '2020',
      },
      {
        icon: '🔒',
        title: 'OHSAS 18001 Certified',
        desc: 'Occupational Health and Safety Management certification for safe work environments.',
        year: '2020',
      },
      {
        icon: '🏗️',
        title: 'Class‑A Contractor License',
        desc: 'Registered with State PWD for major infrastructure works up to unlimited value.',
        year: '2018',
      },
    ],
  },
  {
    id: 'milestones',
    title: 'Major Milestones',
    icon: '📈',
    items: [
      {
        icon: '🎯',
        title: 'Crossed 150+ Projects',
        desc: 'Successfully delivered over 150 projects across 6 states since inception.',
        year: '2025',
      },
      {
        icon: '🏛️',
        title: 'First Defence Project',
        desc: 'Secured first MES (Military Engineering Services) contract for cantonment infrastructure.',
        year: '2020',
      },
      {
        icon: '⚡',
        title: 'BPCL Empanelment',
        desc: 'Empanelled as approved contractor for Bharat Petroleum for fuel station construction.',
        year: '2021',
      },
      {
        icon: '🚆',
        title: 'Railway Infrastructure Entry',
        desc: 'Completed first railway platform shed project for RVNL, marking entry into rail sector.',
        year: '2023',
      },
    ],
  },
  {
    id: 'metrics',
    title: 'Key Performance Metrics',
    icon: '📊',
    items: [
      {
        icon: '👷',
        title: '50+ Government Clients',
        desc: 'Serving defence, PWD, petroleum, railways, and municipal corporations across India.',
        year: 'Ongoing',
      },
      {
        icon: '📋',
        title: '150+ Projects Completed',
        desc: 'Successfully delivered projects ranging from small works to large‑scale infrastructure.',
        year: 'Since 2010',
      },
      {
        icon: '⏱️',
        title: '98% On‑Time Delivery',
        desc: 'Proven track record of meeting deadlines without compromising quality.',
        year: 'Consistent',
      },
      {
        icon: '🤝',
        title: '90% Client Retention',
        desc: 'Long‑standing relationships with government departments and public sector units.',
        year: 'Ongoing',
      },
    ],
  },
];

/**
 * Hero stats
 */
const HERO_STATS = [
  { value: '150+', label: 'Projects Completed' },
  { value: '50+', label: 'Govt. Clients' },
  { value: '98%', label: 'On‑Time Delivery' },
  { value: '15+', label: 'Years of Service' },
];

// ==================== SUB-COMPONENTS ====================

function StatCard({ stat, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
        {stat.value}
      </div>
      <div className="text-sm text-gray-500 font-medium uppercase tracking-wide">
        {stat.label}
      </div>
    </motion.div>
  );
}

function AchievementCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(0,0,0,0.08)' }}
      className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm transition-all duration-300 flex items-start gap-4 group cursor-default"
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-2xl flex-shrink-0 border border-blue-100 group-hover:scale-110 transition-transform">
        {item.icon}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-bold text-gray-800 text-sm md:text-base group-hover:text-blue-600 transition-colors">
            {item.title}
          </h4>
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full ml-auto flex-shrink-0">
            {item.year}
          </span>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed">
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
}

function CategorySection({ category }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-12"
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">{category.icon}</span>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          {category.title}
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent ml-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {category.items.map((item, idx) => (
          <AchievementCard key={idx} item={item} index={idx} />
        ))}
      </div>
    </motion.div>
  );
}

// ==================== MAIN COMPONENT ====================

export default function AchievementsPage() {
  // JSON-LD Schema for achievements
  const achievementsSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BCC Building Creators And Consulting',
    url: 'https://bcc.net.in',
    description: 'Award‑winning construction and consulting firm with 150+ projects, ISO certifications, and recognition from government bodies.',
    award: ACHIEVEMENT_CATEGORIES.flatMap(cat =>
      cat.items.map(item => item.title)
    ).join(', '),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bcc.net.in' },
      { '@type': 'ListItem', position: 2, name: 'Achievements', item: 'https://bcc.net.in/achievements' },
    ],
  };

  return (
    <>
      <SEO
        title="Achievements & Milestones | Awards, Certifications, Success | BCC"
        description="Explore BCC's awards, ISO certifications, major milestones, and key metrics. 150+ projects, 50+ government clients, 98% on‑time delivery since 2010."
        keywords="BCC achievements, construction awards, ISO certified contractor, Uttarakhand, government contractor achievements, milestones, best construction firm"
        url="https://bcc.net.in/achievements"
      />

      <Helmet>
        <script type="application/ld+json">{JSON.stringify(achievementsSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
        </div>
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            <span className="text-sm font-semibold tracking-wide text-blue-200">EXCELLENCE RECOGNISED</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight"
          >
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400">
              Achievements
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            From industry awards to critical certifications and landmark milestones – every achievement
            reflects our <strong className="text-white">unwavering commitment to quality and client success</strong>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto"
          >
            {HERO_STATS.map((stat, idx) => (
              <StatCard key={idx} stat={stat} index={idx} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Achievement Categories */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold uppercase tracking-wider mb-4"
            >
              Our Journey
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4"
            >
              Milestones That{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Define Us
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-500 max-w-2xl mx-auto"
            >
              Every award, certification, and milestone tells the story of our dedication to building better futures.
            </motion.p>
          </div>

          {ACHIEVEMENT_CATEGORIES.map((category) => (
            <CategorySection key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold mb-4"
          >
            Want to Be Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
              Next Success Story
            </span>
            ?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Partner with BCC and let's build something award‑worthy together.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full font-bold text-lg shadow-lg shadow-yellow-500/30 hover:shadow-xl hover:shadow-yellow-500/40 hover:-translate-y-0.5 transition-all"
            >
              Start Your Project →
            </Link>
            <Link
              to="/clients"
              className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all"
            >
              View Our Clients
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}