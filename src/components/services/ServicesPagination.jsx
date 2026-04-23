const ServicesPagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) {
      for (let i = 1; i <= 5; i++) pages.push(i);
    } else if (currentPage >= totalPages - 2) {
      for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
    } else {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-3 mt-12">
      <button 
        className="px-5 py-2 rounded-lg bg-white border-2 border-gray-200 hover:border-purple-500 disabled:opacity-50 transition-all hover:shadow-md"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ← Previous
      </button>
      
      <div className="flex gap-2">
        {getPageNumbers().map(pageNum => (
          <button
            key={pageNum}
            className={`w-10 h-10 rounded-lg transition-all ${
              currentPage === pageNum 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md' 
                : 'bg-white border-2 border-gray-200 hover:border-purple-500'
            }`}
            onClick={() => onPageChange(pageNum)}
          >
            {pageNum}
          </button>
        ))}
      </div>
      
      <button 
        className="px-5 py-2 rounded-lg bg-white border-2 border-gray-200 hover:border-purple-500 disabled:opacity-50 transition-all hover:shadow-md"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next →
      </button>
    </div>
  );
};

export default ServicesPagination;