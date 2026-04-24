import { categories } from '../../data/ServicesData';

const ServiceFilter = ({ selectedCategory, setSelectedCategory, searchTerm, setSearchTerm, services }) => {
  return (
    <section className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 py-4 shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        {/* Search Input */}
        <div className="max-w-md mx-auto mb-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="🔍 Search services by name, category, or keyword..." 
              className="w-full px-5 py-3 pl-12 rounded-full border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map(category => {
            const count = category === "All" 
              ? services.length 
              : services.filter(s => s.category === category).length;
              
            return (
              <button
                key={category}
                className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
                <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                  selectedCategory === category ? 'bg-white/20' : 'bg-gray-200'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceFilter;