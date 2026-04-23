import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import GradientText from '../common/GradientText';

const ServicesCTA = () => {
  const trustItems = [
    { icon: "✓", text: "Free Quote", bg: "bg-green-500/20" },
    { icon: "✓", text: "No Obligation", bg: "bg-blue-500/20" },
    { icon: "⚡", text: "24hr Response", bg: "bg-yellow-500/20" },
    { icon: "🏆", text: "100% Satisfaction", bg: "bg-purple-500/20" }
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"></div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
      </div>
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-yellow-400">⭐</span>
            <span className="text-sm text-white">Trusted by 1000+ Clients</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Ready to Transform Your
            <GradientText className="block">
              Vision into Reality?
            </GradientText>
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Join <span className="text-purple-400 font-bold">1000+ satisfied clients</span> who trusted us with their projects.
            Get expert consultation and a customized quote within <span className="text-purple-400">24 hours</span>.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4 justify-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link 
              to="/contact" 
              className="group relative px-8 py-4 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Free Consultation
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
            
            <Link 
              to="/portfolio" 
              className="px-8 py-4 rounded-full font-semibold text-white border-2 border-white/30 backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300 hover:-translate-y-1"
            >
              View Success Stories
            </Link>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {trustItems.map((item, idx) => (
              <div key={idx} className={`flex items-center justify-center gap-2 px-4 py-2 rounded-full ${item.bg} backdrop-blur-sm border border-white/10`}>
                <span className="text-green-400 font-bold">{item.icon}</span>
                <span className="text-sm text-white">{item.text}</span>
              </div>
            ))}
          </motion.div>

          <motion.div 
            className="mt-8 pt-6 border-t border-white/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm text-gray-400">
              📞 Call us: <a href="tel:+911234567890" className="text-purple-400 hover:text-purple-300">+91 1234567890</a>
              {' '}or{' '}
              📧 Email: <a href="mailto:info@buildingcreators.com" className="text-purple-400 hover:text-purple-300">info@buildingcreators.com</a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesCTA;