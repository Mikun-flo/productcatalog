import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
export function HomePage() {
  const { data, loading } = useFetch('https://dummyjson.com/products?limit=0');
  // Filter top discounted products
  const hotDeals = useMemo(() => {
    if (!data?.products) return [];
    return [...data.products]
      .sort((a, b) => b.discountPercentage - a.discountPercentage)
      .slice(0, 4);
  }, [data]);
  // Unique categories list
  const featuredCategories = useMemo(() => {
    if (!data?.products) return [];
    return [...new Set(data.products.map((p) => p.category))].slice(0, 4);
  }, [data]);

  return (
    <div className="home-container">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-badge">SUMMER SALE IS LIVE</span>
          <h1>Experience Premium Shopping</h1>
          <p>Discover hand-picked collections of top quality products at unmatched prices.</p>
          <Link to="/shop" className="hero-cta-btn">Shop Now &rarr;</Link>
        </div>
      </section>
    