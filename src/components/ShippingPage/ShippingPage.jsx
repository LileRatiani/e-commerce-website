import "./ShippingPage.css";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CurrencyContext } from "../Currency";
import { ShippingInfoContext } from "../ShippingInfoContext";
import { CartContent } from "../CartContent/CartContent"; 

const ShippingPage = () => {
  const [shippingMethod, setShippingMethod] = useState(""); 
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { currency, convert } = useContext(CurrencyContext);
  const { shippingInfo } = useContext(ShippingInfoContext);
  const { cartItems } = useContext(CartContent); 

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = shippingMethod === "express" ? 4.99 : 0;
  const total = subtotal + shippingCost;

  const handleShippingChange = (event) => {
    setShippingMethod(event.target.value);
    setError(""); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!shippingMethod) {
      setError("Please select a shipping method.");
      return;
    }


    navigate("/payment");
  };

  return (
    <div className="shipping-container">
      <div className="left-pane">
        <nav className="breadcrumb">
          <span>Cart</span> &gt; <span>Details</span> &gt; <span className="active">Shipping</span> &gt; <span>Payment</span>
        </nav>

        <div className="contact-info">
          <p><strong>Contact:</strong> {shippingInfo?.contact}</p>
          <p><strong>Ship to:</strong> {`${shippingInfo?.address}, ${shippingInfo?.postalCode}, ${shippingInfo?.city} ${shippingInfo?.province}, ${shippingInfo?.country}`}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <h2>Shipping method</h2>
          <div className="shipping-options">
            <label className="shipping-option">
              <input
                type="radio"
                name="shipping"
                value="standard"
                checked={shippingMethod === 'standard'}
                onChange={handleShippingChange}
              />
              <span>Standard Shipping</span>
              <span className="price">Free</span>
            </label>

            <label className="shipping-option">
              <input
                type="radio"
                name="shipping"
                value="express"
                checked={shippingMethod === 'express'}
                onChange={handleShippingChange}
              />
              <span>Express Shipping</span>
              <span className="price">$4.99</span>
            </label>
          </div>

          {error && <p className="error" style={{ color: "red" }}>{error}</p>}

          <div className="navigation-buttons">
            <Link to="/shippingDetails" className="shipping-details-link">
              Back to details
            </Link>
            <button type="submit" className="continue-button">
              Go to payment
            </button>
          </div>
        </form>
      </div>

      <div className="right-pane">
        {cartItems.map((item, index) => (
          <div className="item-summary" key={index}>
            <div className="item-image">
              <img src={item.image || "https://via.placeholder.com/70x70?text=Item"} alt={item.name} />
              <span className="quantity-badge">{item.quantity}</span>
            </div>
            <div className="item-details">
              <h3>{item.name}</h3>
              <p className="price">
                {currency}{convert(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}

        <div className="price-breakdown">
          <div className="line">
            <span>Subtotal</span>
            <span>{currency}{convert(subtotal).toFixed(2)}</span>
          </div>
          <div className="line">
            <span>Shipping</span>
            <span>
              {shippingMethod === "express"
                ? `${currency}${convert(shippingCost).toFixed(2)}`
                : "Free Shipping"}
            </span>
          </div>
          <div className="line total">
            <span>Total</span>
            <span>{currency}{convert(total).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;
