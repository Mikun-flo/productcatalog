// src/components/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart.js";

export function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="card-link">
        <div className="image-wrapper">
          <img src={product.thumbnail} alt={product.title} loading="lazy" />
        </div>
        <div className="card-info">
          <h4>{product.title}</h4>
          <p className="price">${product.price.toFixed(2)}</p>
        </div>
      </Link>
      <button onClick={() => addToCart(product, 1)} className="add-to-cart-btn">
        Add to cart
      </button>
    </div>
  );
}
