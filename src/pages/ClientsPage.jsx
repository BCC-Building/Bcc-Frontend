// src/pages/ClientsPage.jsx
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

// ==================== CLIENTS DATA WITH DUMMY IMAGES ====================

const CLIENT_CATEGORIES = [
  {
    id: 'defence',
    title: 'Defence & Strategic',
    icon: '🛡️',
    clients: [
      { name: 'Military Engineering Services (MES)', logo: 'https://placehold.co/100x100/1e3a5f/ffffff?text=MES', desc: 'Defence infrastructure & cantonment projects' },
      { name: 'DRDO', logo: 'https://placehold.co/100x100/2c3e50/ffffff?text=DRDO', desc: 'Research facility construction' },
      { name: 'Indian Army', logo: 'https://placehold.co/100x100/3b5323/ffffff?text=ARMY', desc: 'Barracks, training facilities & housing' },
      { name: 'Border Roads Organisation', logo: 'https://placehold.co/100x100/5d4e37/ffffff?text=BRO', desc: 'Strategic road & bridge projects' },
      { name: 'Indian Air Force', logo: 'https://placehold.co/100x100/4a6fa5/ffffff?text=IAF', desc: 'Runway & hangar infrastructure' },
    ],
  },
  {
    id: 'government',
    title: 'Government Departments',
    icon: '🏛️',
    clients: [
      { name: 'Central PWD (CPWD)', logo: 'https://placehold.co/100x100/005a9e/ffffff?text=CPWD', desc: 'Central government building & infrastructure' },
      { name: 'State PWD Uttarakhand', logo: 'https://placehold.co/100x100/2e7d32/ffffff?text=UKPWD', desc: 'State road, bridge & building projects' },
      { name: 'Nagar Nigam (Municipal Corporations)', logo: 'https://placehold.co/100x100/ff6f00/ffffff?text=NN', desc: 'Urban civic infrastructure & development' },
      { name: 'Rural Development Department', logo: 'https://placehold.co/100x100/33691e/ffffff?text=RDD', desc: 'Rural infrastructure & connectivity' },
      { name: 'Irrigation Department', logo: 'https://placehold.co/100x100/0277bd/ffffff?text=IRRI', desc: 'Canal, dam & water management projects' },
    ],
  },
  {
    id: 'energy',
    title: 'Energy & Petroleum',
    icon: '⚡',
    clients: [
      { name: 'Bharat Petroleum (BPCL)', logo: 'https://placehold.co/100x100/ff9800/ffffff?text=BPCL', desc: 'Refinery & fuel station construction' },
      { name: 'Indian Oil Corporation (IOCL)', logo: 'https://placehold.co/100x100/e65100/ffffff?text=IOCL', desc: 'Terminal & pipeline infrastructure' },
      { name: 'NHPC Limited', logo: 'https://placehold.co/100x100/01579b/ffffff?text=NHPC', desc: 'Hydropower civil works' },
      { name: 'Power Grid Corporation', logo: 'https://placehold.co/100x100/4a148c/ffffff?text=PGC', desc: 'Substation & transmission infrastructure' },
      { name: 'NTPC Limited', logo: 'https://placehold.co/100x100/1a237e/ffffff?text=NTPC', desc: 'Thermal plant civil construction' },
    ],
  },
  {
    id: 'transport',
    title: 'Transport & Infrastructure',
    icon: '🚆',
    clients: [
      { name: 'Rail Vikas Nigam Limited (RVNL)', logo: 'https://placehold.co/100x100/880e4f/ffffff?text=RVNL', desc: 'Railway station & track infrastructure' },
      { name: 'Airports Authority of India', logo: 'https://placehold.co/100x100/004d40/ffffff?text=AAI', desc: 'Airport terminal & runway projects' },
      { name: 'National Highways Authority', logo: 'https://placehold.co/100x100/1b5e20/ffffff?text=NHAI', desc: 'Highway & expressway construction' },
      { name: 'RITES Limited', logo: 'https://placehold.co/100x100/3e2723/ffffff?text=RITES', desc: 'Transport consultancy & project management' },
    ],
  },
  {
    id: 'public',
    title: 'Public Sector Undertakings',
    icon: '🏢',
    clients: [
      { name: 'BHEL', logo: 'https://placehold.co/100x100/00695c/ffffff?text=BHEL', desc: 'Heavy engineering & plant construction' },
      { name: 'HAL (Hindustan Aeronautics)', logo: 'https://placehold.co/100x100/263238/ffffff?text=HAL', desc: 'Aerospace facility construction' },
      { name: 'BARC', logo: 'https://placehold.co/100x100/311b92/ffffff?text=BARC', desc: 'Atomic research facility infrastructure' },
      { name: 'CIDCO', logo: 'https://placehold.co/100x100/bf360c/ffffff?text=CIDCO', desc: 'Township & urban planning projects' },
    ],
  },
  {
    id: 'state',
    title: 'State Government Bodies',
    icon: '📜',
    clients: [
      { name: 'Uttarakhand Peyjal Nigam', logo: 'https://placehold.co/100x100/006064/ffffff?text=UPN', desc: 'Water supply & sanitation projects' },
      { name: 'UP Housing Board', logo: 'https://placehold.co/100x100/4e342e/ffffff?text=UPHB', desc: 'Residential township development' },
      { name: 'Delhi Development Authority', logo: 'https://placehold.co/100x100/0d47a1/ffffff?text=DDA', desc: 'Urban development & housing' },
      { name: 'Punjab Mandi Board', logo: 'https://placehold.co/100x100/827717/ffffff?text=PMB', desc: 'Agricultural market infrastructure' },
    ],
  },
];

const TRUST_STATS = [
  { value: '50+', label: 'Government Clients' },
  { value: '150+', label: 'Projects Completed' },
  { value: '98%', label: 'On-Time Delivery' },
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

function ClientCard({ client, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(0,0,0,0.08)' }}
      className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm transition-all duration-300 flex items-start gap-4 group cursor-default"
    >
      {/* Logo image with placeholder */}
      <img
        src={client.logo}
        alt={client.name}
        className="w-12 h-12 rounded-xl object-cover flex-shrink-0 border border-gray-200 group-hover:scale-110 transition-transform"
        loading="lazy"
      />
      {/* Info */}
      <div className="min-w-0">
        <h4 className="font-bold text-gray-800 text-sm md:text-base mb-1 group-hover:text-blue-600 transition-colors">
          {client.name}
        </h4>
        <p className="text-xs text-gray-500 leading-relaxed">
          {client.desc}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {category.clients.map((client, idx) => (
          <ClientCard key={idx} client={client} index={idx} />
        ))}
      </div>
    </motion.div>
  );
}

// ==================== MAIN COMPONENT ====================

export default function ClientsPage() {
  const clientsSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Our Prestigious Clients | BCC Construction & Consulting',
    description: 'BCC proudly serves 50+ government and institutional clients including Defence, PWD, Petroleum, Railways, and more.',
    url: 'https://bcc.net.in/clients',
    mainEntity: {
      '@type': 'Organization',
      name: 'BCC Building Creators And Consulting',
      description: 'Trusted construction partner for government and institutional clients across India.',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bcc.net.in' },
      { '@type': 'ListItem', position: 2, name: 'Clients', item: 'https://bcc.net.in/clients' },
    ],
  };

  return (
    <>
      <SEO
        title="Our Prestigious Clients | Government & Institutional Partners | BCC"
        description="BCC proudly serves 50+ government and institutional clients across Defence, PWD, Petroleum, Railways, and more."
        keywords="BCC clients, government construction clients, MES contractor, PWD construction, defence infrastructure, petroleum construction, BPCL contractor"
        url="https://bcc.net.in/clients"
      />

      <Helmet>
        <script type="application/ld+json">{JSON.stringify(clientsSchema)}</script>
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
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-semibold tracking-wide text-blue-200">TRUSTED BY GOVERNMENT CLIENTS</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight"
          >
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              Prestigious
            </span>{' '}
            Clients
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            BCC is privileged to serve over <strong className="text-white">50+ government and institutional
            clients</strong> across Defence, Infrastructure, Energy, and Public Sector.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto"
          >
            {TRUST_STATS.map((stat, idx) => (
              <StatCard key={idx} stat={stat} index={idx} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Clients by Category */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4"
            >
              Our Esteemed Partners
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4"
            >
              Clients Who{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Trust Us
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-500 max-w-2xl mx-auto"
            >
              Our portfolio spans across every major government department and public sector undertaking.
            </motion.p>
          </div>

          {CLIENT_CATEGORIES.map((category) => (
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
            Ready to Build with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              India's Trusted Partner
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
            Let's discuss your next project.
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
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-bold text-lg shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all"
            >
              Start Your Project →
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all"
            >
              View Our Work
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}