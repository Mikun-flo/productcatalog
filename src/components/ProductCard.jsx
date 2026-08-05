
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart.js";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  // Render SVG Rating Stars
  const renderStars = (rating) => {
    const roundedRating = Math.round(rating || 5);
    return (
      <div className="star-rating">
        {Array.from({ length: 5 }).map((_, index) => (
          <svg
            key={index}
            className={`star-icon ${index < roundedRating ? "filled" : "empty"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
        <span className="rating-num">({product.rating?.toFixed(1)})</span>
      </div>
    );
  };
  return (
    <div className="product-card-premium">
      {product.discountPercentage > 10 && (
        <span className="discount-badge">
          -{Math.round(product.discountPercentage)}%
        </span>
      )}
 
      <Link to={`/product/${product.id}`} className="card-link">
        <div className="image-wrapper-premium">
          <img src={product.thumbnail} alt={product.title} loading="lazy" />
        </div>
        <div className="card-info-premium">
          <span className="category-tag">{product.category}</span>
          <h4 className="product-title">{product.title}</h4>
          {renderStars(product.rating)}
          <div className="price-row">
            <span className="current-price">${product.price.toFixed(2)}</span>
            {product.discountPercentage > 0 && (
              <span className="original-price">
                $
                {(
                  product.price /
                  (1 - product.discountPercentage / 100)
                ).toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>
       
      <button
        onClick={() => addToCart(product, 1)}
        className="add-to-cart-btn-premium"
      >
        <svg
          className="cart-btn-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        Add to cart
      </button>
    </div>
  );
}
