
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

export function Header() {
  const { totalItemCount } = useCart();

  return (
    <header className="site-header">
      <div className="header-container">
        <Link to="/" className="logo">Shopfront</Link>
        <nav className="nav-links">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
          <NavLink to="/cart" className={({ isActive }) => (isActive ? 'active' : 'nav-cart')}>
            Cart 
            {totalItemCount > 0 && <span className="cart-badge">{totalItemCount}</span>}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}