import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart.js';
import { toast } from 'react-toastify';

export default function CheckoutPage() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isOrdered, setIsOrdered] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  // Redirect if cart is empty and order hasn't been completed yet  
  useEffect(() => {
    if (cartItems.length === 0 && !isOrdered) {
      navigate("/cart", { replace: true });
    }
  }, [cartItems, navigate, isOrdered]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.address) {
      toast.error("Please fill in all shipping details.");
      return;
    }

    // Simulate order placement
    setIsOrdered(true);
    clearCart(); // Empties cart state
    toast.success("Your Order has been placed successfully!");
  };
  if (isOrdered) {
    return (
      <div className="order-success-state">
        <h2>Thank you for your order!</h2>
        <p>
          Your order has been placed. We sent a receipt to{" "}
          <strong>{formData.email}</strong>.
        </p>
        <button onClick={() => navigate("/")} className="catalog-link-btn">
          Back to catalog
        </button>
      </div>
    );
  } 
  return (
    <div className="checkout-page-container">
      <div className="checkout-split">
        {/* Left Side: Order Summary */}
        <div className="order-summary-card">
          <h3>Order summary</h3>
          <div className="summary-items">
            {cartItems.map((item) => (
              <div key={item.id} className="summary-item-row">
                <span>
                  {item.title} x{item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="summary-total-row">
            <span>Total</span>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>
        </div>
        {/* Right Side: Shipping Details Form */}
        <form onSubmit={handleSubmit} className="shipping-form">
          <h3>Shipping details</h3>
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              required
              value={formData.address}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <button type="submit" className="place-order-btn">
            Place order
          </button>
        </form>
      </div>
    </div>
  );
}