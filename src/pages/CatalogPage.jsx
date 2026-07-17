
import React, { useState, useMemo } from "react";
import { useFetch } from "../hooks/useFetch.js";
import { FilterBar } from "../components/FilterBar.jsx";
import { ProductCard } from "../components/ProductCard.jsx";

export function CatalogPage() {
  const { data, loading, error } = useFetch(
    "https://dummyjson.com/products?limit=0", 
  );
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    minPrice: "",
    maxPrice: "",
  });

  // Calculate categories from fetched product list
  const categories = useMemo(() => {
    if (!data?.products) return [];
    return [...new Set(data.products.map((p) => p.category))];
  }, [data]);

  // Combine and apply all filters in a single filter block/page
  const filteredProducts = useMemo(() => {
    if (!data?.products) return [];
    return data.products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(filters.search.toLowerCase());
      const matchesCategory =
        filters.category === "all" || product.category === filters.category;

      const min = parseFloat(filters.minPrice);
      const max = parseFloat(filters.maxPrice);
      const matchesMinPrice = isNaN(min) || product.price >= min;
      const matchesMaxPrice = isNaN(max) || product.price <= max;

      return (
        matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice
      );
    });
  }, [data, filters]);

  if (loading)
    return <div className="page-state">Loading product catalog...</div>;
  if (error)
    return (
      <div className="page-state error">
        Failed to load catalog. Please try again.
      </div>
    );
    
  return (
    <div className="catalog-container">
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        categories={categories}
      />
      <div className="products-view">
        {filteredProducts.length === 0 ? (
          <div className="no-results">
            No products found matching the criteria.
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}  

