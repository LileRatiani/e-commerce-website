import { useContext } from "react";
import { CurrencyContext } from "../Currency";
import { CartContent } from "../CartContent/CartContent";
import { Link, useNavigate } from "react-router-dom";
import "./ProductCard.css";

export default function ProductCard({ id, title, price, image, inStock = true }) {
  const { addToCart } = useContext(CartContent);
  const { currency, convert } = useContext(CurrencyContext); 
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inStock) {
      addToCart({ id, title, price, image });
    }
  };

  return (
    <div className={`product-card-wrapper ${!inStock ? "out" : ""}`}>
      {inStock ? (
        <Link to={`/product/${id}`} className="product-card-link">
          <div className="product-card">
            <div className="image-container">
              <img src={image} alt={title} />
              <div className="cart-icon" onClick={handleAddToCart}>
                <i className="fas fa-shopping-cart add-to-cart"></i>
              </div>
            </div>
            <div className="product-info">
              <p className="title">{title}</p>
              <p className="price">{currency}{convert(price).toFixed(2)}</p>
            </div>
          </div>
        </Link>
      ) : (
        <div className="product-card out-of-stock-card">
          <div className="image-container">
            <img src={image} alt={title} className="faded" />
            <span className="out-of-stock-label">OUT OF STOCK</span>
          </div>
          <div className="product-info">
            <p className="title">{title}</p>
            <p className="price">{currency}{convert(price).toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
