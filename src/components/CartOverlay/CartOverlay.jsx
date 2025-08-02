import "./CartOverlay.css"; 
import { useContext } from "react";
import { CartContent } from "../CartContent/CartContent";
import { CurrencyContext } from "../Currency";
import { Link } from "react-router-dom";

export default function CartOverlay({ closeOverlay }) {
  const { cartItems, updateQty, updateSize } = useContext(CartContent);
  const { currency, convert } = useContext(CurrencyContext);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + convert(item.price) * item.quantity,
    0
  );

  return (
    <div className="cart-overlay">
      <div className="overlay-box">
        <h3 className="overlay-title">
          My Bag, <span>{cartItems.length} items</span>
        </h3>

        {cartItems.map((item) => (
          <div key={`${item.id}-${item.selectedSize}`} className="overlay-item">
            <div className="overlay-item-details">
              <p className="item-name">{item.title}</p>
              <p className="item-price">
                {currency}
                {convert(item.price).toFixed(2)}
              </p>

              <p className="size-label">Size:</p>
              <div className="size-buttons">
                {["XS", "S", "M", "L"].map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${item.selectedSize === size ? "selected" : ""}`}
                    onClick={() => updateSize(item.id, item.selectedSize, size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="qty-image-container">
              <div className="qty-controls">
                <button onClick={() => updateQty(item.id, item.selectedSize, 1)}>+</button>
                <p>{item.quantity}</p>
                <button onClick={() => updateQty(item.id, item.selectedSize, -1)}>-</button>
              </div>
              <img src={item.image} alt={item.title} />
            </div>
          </div>
        ))}

        <div className="total-row">
          <span>Total</span>
          <span>
            {currency}
            {totalPrice.toFixed(2)}
          </span>
        </div>

        <div className="overlay-buttons">
          <Link to="/cart" onClick={closeOverlay}>
            <button className="view-bag">VIEW BAG</button>
          </Link>
          <Link to="/shippingDetails" onClick={closeOverlay}>
            <button className="checkout-btn">CHECK OUT</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
