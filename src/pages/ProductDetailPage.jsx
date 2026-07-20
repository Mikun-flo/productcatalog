
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch.js';
import { useCart } from '../hooks/useCart.js';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { data: product, loading, error } = useFetch(`https://dummyjson.com/products/${id}`);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };
  
  if (loading) return <div className="page-state">Loading product details...</div>;
  if (error || !product) {
    return (
      <div className="page-state error">
        <p>Product not found.</p>
        <Link to="/" className="back-link">Return to catalog</Link>
      </div>
    );
  }
  
  return (
    <div className="detail-page-container">
      <Link to="/" className="back-link">&lt; Back to results</Link>
      <div className="detail-card">
        <div className="detail-image-wrapper">
          <img src={product.thumbnail} alt={product.title} />
        </div>
        <div className="detail-info">
          <h2>{product.title}</h2>
          <p className="detail-price">${product.price.toFixed(2)}</p>
          <p className="detail-description">{product.description}</p>
          
          <div className="quantity-selection">
            <span className="label">Quantity</span>
            <div className="quantity-controls">
              <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>-</button>
              <span className="qty-value">{quantity}</span>
              <button onClick={() => handleQuantityChange(1)}>+</button>
            </div>
          </div>
          
          <button onClick={() => addToCart(product, quantity)} className="detail-add-btn">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
