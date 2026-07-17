import React from 'react';
export function FilterBar({ filters, setFilters, categories }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };
  const handleClear = () => {
    setFilters({
      search: "",
      category: "all",
      minPrice: "",
      maxPrice: "",
    });
  };
  return (
    <aside className="filter-sidebar">
      <h3>Filters</h3>

      <div className="filter-group">
        <label htmlFor="search">Search products</label>
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Search products..."
          value={filters.search}
          onChange={handleChange}
        />
      </div>
      <div className="filter-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={filters.category}
          onChange={handleChange}
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group-price">
        <label>Price Range</label>
        <div className="price-inputs">
          <input
            type="number"
            name="minPrice"
            placeholder="Min"
            value={filters.minPrice}
            onChange={handleChange}
            min="0"
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={handleChange}
            min="0"
          />
        </div>
      </div>
      <button onClick={handleClear} className="clear-filters-btn">
        Clear filters
      </button>
    </aside>
  );
}
