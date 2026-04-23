import ServiceCard from './ServiceCard';

const ServicesGrid = ({ services, filteredCount, searchTerm, onClearFilters }) => {
  if (services.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">No services found</h3>
        <p className="text-gray-600 mb-6">We couldn't find any services matching "{searchTerm}"</p>
        <button 
          onClick={onClearFilters}
          className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
        >
          Clear filters
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm text-sm text-gray-600">
          <span>🔍</span>
          <span>Showing <strong className="text-purple-600">{services.length}</strong> of <strong>{filteredCount}</strong> services</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>
    </>
  );
};

export default ServicesGrid;