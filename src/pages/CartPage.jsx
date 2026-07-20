
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart.js';
import { CartItem } from '../components/CartItem.jsx';

export default function CartPage() {
  const { cartItems, totalPrice } = useCart();
  const navigate = useNavigate();
  
  if (cartItems.length === 0) {
    return (
      <div className="empty-cart-state">
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="catalog-link-btn">Go Shop</Link>
      </div>
    );
  }
 
  return (
    <div className="cart-page-container">
      <h2>Your cart</h2>
      <div className="cart-content">
        <div className="cart-items-list">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div className="cart-summary-box">
          <div className="total-row">
            <span>Total</span>
            <span className="total-amount">${totalPrice.toFixed(2)}</span>
          </div>
          <button onClick={() => navigate('/checkout')} className="checkout-btn">
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
}
