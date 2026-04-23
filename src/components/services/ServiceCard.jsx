import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ServiceCard = ({ 
  service, 
  index, 
  variant = 'default', // 'default' | 'compact' | 'home'
  className = "" 
}) => {
  // Styling variations
  const cardStyles = {
    default: 'bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6',
    compact: 'bg-white rounded-xl shadow-md hover:shadow-xl p-4',
    home: 'bg-white rounded-2xl shadow-md hover:shadow-xl p-5 border border-gray-100'
  };

  const imageHeight = {
    default: 'h-48',
    compact: 'h-40',
    home: 'h-44'
  };

  const titleSize = {
    default: 'text-xl',
    compact: 'text-lg',
    home: 'text-lg'
  };

  const showFeatures = variant !== 'compact';

  return (
    <motion.div
      className={`group ${cardStyles[variant]} transition-all duration-300 hover:-translate-y-2 overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <div className={`relative ${imageHeight[variant]} -mx-6 -mt-6 mb-4 overflow-hidden`}>
        <img 
          src={service.image} 
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-4 right-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
            <span className="text-2xl">{service.icon}</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <span className="text-white text-sm font-semibold">{service.category}</span>
        </div>
      </div>
      
      <h3 className={`${titleSize[variant]} font-bold text-gray-800 mb-2 line-clamp-1`}>
        {service.name}
      </h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {service.shortDesc}
      </p>
      
      {showFeatures && (
        <div className="flex flex-wrap gap-2 mb-4">
          {service.features?.slice(0, 2).map((feature, idx) => (
            <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              ✓ {feature.length > 20 ? feature.substring(0, 20) + '...' : feature}
            </span>
          ))}
          {service.features?.length > 2 && (
            <span className="text-xs text-purple-600 px-2 py-1">
              +{service.features.length - 2} more
            </span>
          )}
        </div>
      )}
      
      <Link 
        to={`/services/${service.slug}`} 
        className="inline-flex items-center gap-2 text-purple-600 font-semibold text-sm hover:gap-3 transition-all group"
      >
        Learn More
        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </motion.div>
  );
};

export default ServiceCard;