import "./PaymentPage.css";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CurrencyContext } from "../Currency";
import { ShippingInfoContext } from "../ShippingInfoContext";
import { CartContent } from "../CartContent/CartContent"; 

const PaymentPage = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [holderName, setHolderName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const { currency, convert } = useContext(CurrencyContext);
  const { shippingInfo } = useContext(ShippingInfoContext);
  const { cartItems } = useContext(CartContent); 
  const navigate = useNavigate();

  const shippingMethod = shippingInfo?.shippingMethod || "standard";
  const shippingCost = shippingMethod === "express" ? 4.99 : 0;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + shippingCost;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cardNumber || !holderName || !expiry || !cvv) {
      alert("Please fill in all payment details.");
      return;
    }

    navigate("/confirmed");
  };

  return (
    <div className="shipping-container">
      <div className="left-pane">
        <nav className="breadcrumb">
          <span>Cart</span> &gt; <span>Details</span> &gt; <span>Shipping</span> &gt; <span className="active">Payment</span>
        </nav>

        <div className="contact-info">
          <p><strong>Contact</strong> {shippingInfo?.contact}</p>
          <p><strong>Ship to</strong> {`${shippingInfo?.address}, ${shippingInfo?.postalCode}, ${shippingInfo?.city} ${shippingInfo?.province}, ${shippingInfo?.country}`}</p>
          <p><strong>Method</strong> {shippingMethod === "express" ? "Express Shipping – $4.99" : "Standard Shipping – FREE"}</p>
        </div>

        <h2>Payment method</h2>
        <form onSubmit={handleSubmit} className="payment-method">
          <div className="card-header">
            <i className="fa fa-credit-card" /> Credit Card
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Holder Name"
              value={holderName}
              onChange={(e) => setHolderName(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <input
              type="text"
              placeholder="Expiration (MM/YY)"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
            />
          </div>

          <div className="navigation-buttons">
            <Link to="/shipping">
              <button type="button" className="shipping-details-link">Back to shipping</button>
            </Link>
            <button type="submit" className="continue-button">Pay now</button>
          </div>
        </form>
      </div>

      <div className="right-pane">
        {cartItems.map((item, index) => (
          <div className="item-summary" key={index}>
            <div className="item-image">
              <img src={item.image} alt={item.name} />
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
            <span>{shippingMethod === "express" ? `${currency}${convert(shippingCost).toFixed(2)}` : "Free Shipping"}</span>
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

export default PaymentPage;
