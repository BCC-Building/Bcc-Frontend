// src/pages/FAQPage.jsx - Production-Ready with Schema.org + Search
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import SEO from "../components/SEO";
import FAQHero from "../components/faq/FAQHero";

// ==================== FAQ DATA ====================

/** FAQ Categories for filtering */
const CATEGORIES = ["All", "Services", "Process", "Pricing", "Support"];

/** 
 * FAQ Data Array
 * Each FAQ has: question, answer, category
 * To add new FAQ: Add new object to this array
 */
const FAQS = [
  // Services
  {
    question: "What services does BCC provide?",
    answer: "We provide Structure Design, Architecture Design, Soil Investigation, Material Testing, NDT Testing, and Land Survey services with 8+ years of industry experience across residential, commercial, and industrial projects.",
    category: "Services",
  },
  {
    question: "Do you offer customized solutions?",
    answer: "Yes! Every project is unique. We offer fully customized engineering and consulting solutions tailored to your specific requirements, budget, and timeline.",
    category: "Services",
  },
  {
    question: "What industries do you serve?",
    answer: "We serve residential, commercial, industrial, and infrastructure sectors. Our team has experience with high-rise buildings, bridges, water treatment plants, and large-scale residential complexes.",
    category: "Services",
  },

  // Process
  {
    question: "How does your project process work?",
    answer: "Our process is simple: 1) Initial consultation to understand your needs, 2) Site visit and assessment, 3) Detailed proposal with timeline and cost, 4) Design and planning phase, 5) Execution and quality control, 6) Final delivery with documentation.",
    category: "Process",
  },
  {
    question: "How long does a typical project take?",
    answer: "Project duration depends on scope and complexity. A soil investigation may take 3-5 days, while a full structural design project can take 2-8 weeks. We provide clear timelines during the proposal stage.",
    category: "Process",
  },
  {
    question: "Do you handle government approvals?",
    answer: "Yes, we assist clients with necessary documentation and compliance for government approvals, building permits, and regulatory clearances related to our scope of work.",
    category: "Process",
  },

  // Pricing
  {
    question: "How do you price your services?",
    answer: "Our pricing is transparent and project-based. We provide detailed quotations after understanding your requirements. No hidden costs â€” everything is documented upfront.",
    category: "Pricing",
  },
  {
    question: "Do you offer free consultations?",
    answer: "Yes! We offer a free initial consultation to understand your project needs and provide preliminary recommendations. Contact us to schedule yours.",
    category: "Pricing",
  },

  // Support
  {
    question: "How can I contact your team?",
    answer: "You can reach us via our contact form, email at info@bcc.net.in, or call us directly. Visit our Contact page for all options including WhatsApp chat.",
    category: "Support",
  },
  {
    question: "What areas do you serve?",
    answer: "We primarily serve Uttarakhand, Delhi NCR, Uttar Pradesh, Punjab, and Haryana. For larger projects, we can travel pan-India. Remote consultation is also available.",
    category: "Support",
  },
  {
    question: "Do you provide post-project support?",
    answer: "Absolutely! We provide post-project support including documentation, as-built drawings, and consultation for any modifications. Client satisfaction is our priority.",
    category: "Support",
  },
];

// ==================== SCHEMA GENERATOR ====================

/**
 * Generates FAQPage JSON-LD schema for Google rich results
 * This helps FAQs appear directly in Google search results
 */
const generateFAQSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

// ==================== MAIN COMPONENT ====================

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // ==================== FILTERING ====================

  /** Filter FAQs by category and search query */
  const filteredFAQs = useMemo(() => {
    let filtered = FAQS;

    // Filter by category
    if (activeCategory !== "All") {
      filtered = filtered.filter((faq) => faq.category === activeCategory);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (faq) =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [activeCategory, searchQuery]);

  // ==================== HANDLERS ====================

  const toggleFAQ = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      {/* ==================== SEO ==================== */}
      <SEO
        title="FAQ | Frequently Asked Questions About BCC Services"
        description="Find answers to common questions about BCC's construction, engineering & consulting services. Learn about our process, pricing, timeline & expertise."
        keywords="FAQ, frequently asked questions, BCC services, construction FAQ, engineering services FAQ"
        url="https://bcc.net.in/faq"
        image="https://bcc.net.in/og-faq.jpg"
      />

      {/* ==================== JSON-LD SCHEMA ==================== */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(generateFAQSchema(FAQS))}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* HERO */}
        <FAQHero />

        {/* ==================== SEARCH + FILTER ==================== */}
        <section className="max-w-3xl mx-auto px-6 pb-8">
          {/* Search Bar */}
          <div className="relative mb-6">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search your question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-800"
              aria-label="Search FAQs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                &times;
              </button>
            )}
          </div>

          {/* Category Filters */}
          <nav className="flex flex-wrap justify-center gap-2" aria-label="FAQ categories">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </nav>

          {/* Results Count */}
          <p className="text-center text-sm text-gray-500 mt-3">
            {filteredFAQs.length} question{filteredFAQs.length !== 1 ? "s" : ""} found
          </p>
        </section>

        {/* ==================== FAQ LIST ==================== */}
        <section className="max-w-3xl mx-auto px-6 pb-16 space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">ðŸ”</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No questions found</h3>
              <p className="text-gray-500 mb-4">
                Try a different search term or browse all categories.
              </p>
              <button
                onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                className="px-5 py-2 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            filteredFAQs.map((faq, index) => (
              <motion.div
                key={`faq-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center px-5 py-4 text-left"
                  aria-expanded={activeIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-base md:text-lg font-semibold text-gray-800 pr-4">
                    {faq.question}
                  </span>
                  <span
                    className={`text-blue-600 text-xl flex-shrink-0 transition-transform duration-300 ${
                      activeIndex === index ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {activeIndex === index && (
                    <motion.div
                      key={`content-${index}`}
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                        {faq.answer}
                        {/* Category Badge */}
                        <div className="mt-3">
                          <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full font-medium">
                            {faq.category}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </section>

        {/* ==================== CTA ==================== */}
        <section className="text-center pb-20 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-10 max-w-2xl mx-auto text-white"
          >
            <h2 className="text-2xl font-bold mb-3">Still have questions?</h2>
            <p className="text-blue-100 mb-6">
              Our team is ready to help. Reach out for personalized guidance on your project.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/contact"
                className="inline-block bg-white text-blue-600 px-7 py-3 rounded-lg font-semibold shadow hover:bg-gray-100 transition"
              >
                Contact Us
              </Link>
              <a
                href="tel:+918057540906"
                className="inline-block bg-blue-500 text-white px-7 py-3 rounded-lg font-semibold border border-blue-400 hover:bg-blue-600 transition"
              >
                📞 Call Now
              </a>
            </div>
          </motion.div>
        </section>

      </div>
    </>
  );
}

