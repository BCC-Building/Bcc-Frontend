import React from "react";
import { motion } from "framer-motion";
import { 
  FaHandshake, FaHardHat, FaUsers, FaLightbulb 
} from "react-icons/fa";

/**
 * PrincipalsSection - The 4 Principal Pillars of BCC
 * Showcases core values with icons and descriptions
 */

const PILLARS = [
  {
    icon: FaHandshake,
    title: "Adherence for Trust & Reliability",
    description: "We prioritize integrity in every project, building lasting relationships through consistent excellence and transparent communication.",
    color: "from-amber-500 to-amber-600",
    icon_color: "text-amber-600"
  },
  {
    icon: FaHardHat,
    title: "Quality Construction & Design",
    description: "World-class craftsmanship meets innovative design. Every structure reflects our commitment to durability and aesthetic excellence.",
    color: "from-blue-500 to-blue-600",
    icon_color: "text-blue-600"
  },
  {
    icon: FaUsers,
    title: "Customer-Centric Approach",
    description: "Your vision is our mission. We listen, adapt, and deliver solutions tailored to your unique needs and aspirations.",
    color: "from-rose-500 to-rose-600",
    icon_color: "text-rose-600"
  },
  {
    icon: FaLightbulb,
    title: "Innovation & Adaptability",
    description: "Staying ahead with modern technology and forward-thinking strategies to create sustainable, future-ready solutions.",
    color: "from-emerald-500 to-emerald-600",
    icon_color: "text-emerald-600"
  }
];

const PillarCard = ({ pillar, index }) => {
  const Icon = pillar.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true, amount: 0.3 }}
      className="h-full"
    >
      <div className="h-full rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8 border border-gray-100 hover:border-gray-200">
        {/* Icon Container */}
        <div className="mb-6">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${pillar.color} bg-opacity-10`}>
            <Icon className={`${pillar.icon_color} text-3xl`} />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
          {pillar.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed text-base">
          {pillar.description}
        </p>
      </div>
    </motion.div>
  );
};

export default function PrincipalsSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4 px-4 py-2 bg-amber-100 rounded-full">
            <span className="text-amber-700 font-semibold text-sm uppercase tracking-wide">
              Our Foundation
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Principal Pillars
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            These four cornerstones guide every decision, project, and interaction. 
            They define who we are and what we stand for.
          </p>
        </motion.div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PILLARS.map((pillar, index) => (
            <PillarCard key={index} pillar={pillar} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-700 text-lg mb-6">
            These values aren't just words — they're embedded in our DNA and reflected in every project we undertake.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Experience Our Difference →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
