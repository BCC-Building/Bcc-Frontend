import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What services does your company provide?",
    answer:
      "We provide Structure Design, Architecture Design, Soil Investigation, Material Testing, and Land Survey services with 8+ years of experience.",
  },
  {
    question: "How can I contact your team?",
    answer:
      "You can contact us via our website contact form, email, or directly call our support number available on the contact page.",
  },
  {
    question: "Do you offer customized solutions?",
    answer:
      "Yes, we offer fully customized solutions based on client requirements and project needs.",
  },
  {
    question: "What industries do you serve?",
    answer:
      "We serve residential, commercial, industrial, and infrastructure sectors.",
  },
];

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900">
      <section className="pt-24 pb-16 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-extrabold mb-4 text-gray-900"
        >
          Frequently Asked Questions
        </motion.h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Quick answers to help you understand our services, process, and expertise.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-16 space-y-5">
        {faqs.map((faq, index) => (
          <motion.div
            key={`faq-${index}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <button
              type="button"
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-5 py-4"
            >
              <span className="text-base md:text-lg font-semibold text-gray-800">
                {faq.question}
              </span>
              <span className="text-blue-600 text-xl">
                {activeIndex === index ? "−" : "+"}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {activeIndex === index && (
                <motion.div
                  key={`content-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="px-5 pb-5 text-gray-600 leading-relaxed overflow-hidden"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </section>

      <section className="text-center pb-20">
        <h2 className="text-2xl font-bold mb-3">Still need help?</h2>
        <p className="text-gray-600 mb-6">Contact our team for detailed guidance on your project.</p>
        <a
          href="/contact"
          className="inline-block bg-blue-600 text-white px-7 py-3 rounded-lg font-medium shadow hover:bg-blue-700 transition"
        >
          Contact Us
        </a>
      </section>

    </div>
  );
}
