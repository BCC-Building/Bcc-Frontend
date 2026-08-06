import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiClipboard, FiCheckCircle, FiZap, FiTool } from 'react-icons/fi';

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-[#0a1628] via-[#0f2b3d] to-[#0a1628]">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Heading - Problem */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
          Stuck with Your <span className="text-blue-400">Construction Project?</span>
        </h2>

        {/* Sub-heading - Solution */}
        <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mt-4 mb-8 leading-relaxed">
          From soil testing to structural design — our experts help you avoid costly mistakes, 
          ensure safety, and deliver on time. <span className="text-blue-400 font-semibold">1200+ projects delivered.</span>
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/contact"
            className="group w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 flex items-center justify-center gap-2 min-w-[200px]"
          >
            Start Your Project
            <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            to="/services"
            className="group w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-white/90 bg-white/5 backdrop-blur-sm border border-blue-500/40 hover:bg-blue-500/20 hover:border-blue-400 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <FiClipboard className="w-4 h-4" />
            Explore Services
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-sm text-white/40">
          <span className="flex items-center gap-1.5">
            <FiCheckCircle className="w-4 h-4 text-blue-400" /> Free Site Visit
          </span>
          <span className="flex items-center gap-1.5">
            <FiZap className="w-4 h-4 text-blue-400" /> 24h Response
          </span>
          <span className="flex items-center gap-1.5">
            <FiTool className="w-4 h-4 text-blue-400" /> 1200+ Projects
          </span>
          <span className="flex items-center gap-1.5">
            <FiCheckCircle className="w-4 h-4 text-blue-400" /> ISO Certified
          </span>
        </div>
      </div>
    </section>
  );
}