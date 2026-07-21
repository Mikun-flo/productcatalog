
import React from "react";
import { useCart } from "../hooks/useCart.js";

export function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="cart-item-row">
      <div className="item-details">
        <img src={item.image} alt={item.title} className="cart-item-thumb" />
        <div>
          <h5>{item.title}</h5>
          <p className="unit-price">${item.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="item-quantity-subtotal">
        <div className="quantity-controls">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span className="qty-value">{item.quantity}</span>
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
            +
          </button>
        </div>
        <span className="subtotal">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
        <button
          onClick={() => removeFromCart(item.id, item.title)}
          className="remove-btn"
          aria-label="Remove item"
        >
          x
        </button>
      </div>
    </div>
  );
}
