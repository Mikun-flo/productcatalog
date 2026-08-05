import { useState, useMemo, useEffect } from "react";
import { useFetch } from "../hooks/useFetch.js";
import { FilterBar } from "../components/FilterBar.jsx";
import ProductCard from "../components/ProductCard.jsx";

export default function CatalogPage() {
  const { data, loading, error } = useFetch('https://dummyjson.com/products?limit=0');
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    minPrice: '',
    maxPrice: '',
  });
  
  // Pagination 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items shown per page

  // Calculate unique categories from fetched product list
  const categories = useMemo(() => {
    if (!data?.products) return [];
    return [...new Set(data.products.map((p) => p.category))];
  }, [data]);

  // Combine and apply all filters  
  const filteredProducts = useMemo(() => {
    if (!data?.products) return [];
    return data.products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = filters.category === 'all' || product.category === filters.category;
      
      const min = parseFloat(filters.minPrice);
      const max = parseFloat(filters.maxPrice);
      const matchesMinPrice = isNaN(min) || product.price >= min;
      const matchesMaxPrice = isNaN(max) || product.price <= max;

      return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice;
    });
  }, [data, filters]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Slice the filtered items for the current page
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Smooth scroll to top of list
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <CatalogSkeleton />; // Premium skeleton layout
  if (error) return <div className="page-state error">Failed to load catalog. Please try again.</div>;

  return (
    <div className="catalog-container">
      <FilterBar filters={filters} setFilters={setFilters} categories={categories} />
      <div className="products-view">
        {filteredProducts.length === 0 ? (
          <div className="no-results">
            <h3>No products found</h3>
            <p>Try adjusting your keywords or clearing the filters.</p>
          </div>
        ) : (
          <>
            <div className="catalog-meta">
              <p>Showing {Math.min(filteredProducts.length, (currentPage - 1) * itemsPerPage + 1)}-{Math.min(filteredProducts.length, currentPage * itemsPerPage)} of {filteredProducts.length} products</p>
            </div>
            
            <div className="products-grid">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pagination-bar">
                <button 
                  onClick={() => handlePageChange(currentPage - 1)} 
                  disabled={currentPage === 1}
                  className="page-btn prev-btn"
                >
                  &larr; Previous
                </button>
                
                <div className="page-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`page-number-btn ${currentPage === pageNum ? 'active' : ''}`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => handlePageChange(currentPage + 1)} 
                  disabled={currentPage === totalPages}
                  className="page-btn next-btn"
                >
                  Next &rarr;
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Visual loading skeletons
function CatalogSkeleton() {
  return (
    <div className="catalog-container skeleton-loading">
      <div className="skeleton-sidebar"></div>
      <div className="products-view">
        <div className="products-grid">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="skeleton-card">
              <div className="skeleton-image"></div>
              <div className="skeleton-text line-1"></div>
              <div className="skeleton-text line-2"></div>
              <div className="skeleton-btn"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
