
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function CTASection({
  heading = "Ready to Build Your Dream Project?",
  subtext = "Let's discuss your vision and turn it into reality with BCC's proven expertise, transparent process, and dedicated team.",
  primaryLabel = "Get Free Consultation",
  primaryTo = "/contact",
  secondaryLabel = "View Portfolio",
  secondaryTo = "/projects",
  phone = "+91 80575 40906",
  email = "bcc06.info@gmail.com",
  address = "Rudrapur, Uttarakhand",
}) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative w-full py-16 md:py-20 overflow-hidden bg-gradient-to-br from-[#0a0f1e] via-[#0f172a] to-[#1e3a5f]"
    >
      {/* ─── Ambient Glow Orbs ───────────────────────────────────────────── */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-blue-400/15 blur-3xl pointer-events-none" />

      {/* ─── Content ────────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm border border-blue-500/40 rounded-full px-4 py-1.5 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50 animate-pulse" />
          <span className="text-blue-300 text-[10px] font-bold tracking-wider uppercase">
            Start Today
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-3">
          {heading.includes("Dream Project") ? (
            <>
              {heading.split("Dream Project")[0]}
              <span className="bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
                Dream Project
              </span>
              {heading.split("Dream Project")[1] || "?"}
            </>
          ) : (
            heading
          )}
        </h2>

        {/* Subtext */}
        <p className="text-white/75 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
          {subtext}
        </p>

        {/* ─── Buttons ────────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-9">
          {/* Primary Button */}
          <Link
            to={primaryTo}
            className="group inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm text-white bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-lg hover:shadow-blue-500/40 hover:-translate-y-0.5"
            aria-label={primaryLabel}
          >
            {primaryLabel}
            <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
          </Link>

          {/* Secondary Button */}
          <Link
            to={secondaryTo}
            className="group inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm text-white/90 border border-white/40 hover:bg-white/10 hover:border-white/70 transition-all duration-300 hover:-translate-y-0.5"
            aria-label={secondaryLabel}
          >
            {secondaryLabel}
          </Link>
        </div>

        {/* ─── Contact Strip ──────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-5 border-t border-white/10 text-white/50 text-xs sm:text-sm">
          <span className="inline-flex items-center gap-2">
            <FaPhoneAlt className="text-blue-400/60" size={12} />
            {phone}
          </span>
          <span className="inline-flex items-center gap-2">
            <FaEnvelope className="text-blue-400/60" size={12} />
            {email}
          </span>
          <span className="inline-flex items-center gap-2">
            <FaMapMarkerAlt className="text-blue-400/60" size={12} />
            {address}
          </span>
        </div>
      </div>
    </motion.section>
  );
}