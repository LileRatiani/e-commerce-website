import "./PaymentConfirmed.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContent } from "../CartContent/CartContent";
import { CurrencyContext } from "../Currency";
import { ShippingInfoContext } from "../ShippingInfoContext";

const PaymentConfirmed = () => {
  const { cartItems }        = useContext(CartContent);
  const { currency, convert }= useContext(CurrencyContext);
  const { shippingInfo }     = useContext(ShippingInfoContext);

  const shippingMethod = shippingInfo?.shippingMethod || "standard";
  const shippingCost   = shippingMethod === "express" ? 4.99 : 0;
  const subtotal       = cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const total          = subtotal + shippingCost;

  const orderId = `#${Math.floor(Math.random()*9000)+1000}`;   // e.g. #2437

  return (
    <div className="payment-confirmation-container">
      <div className="left-pane">
        <nav className="breadcrumb">
          Cart &gt; Details &gt; Shipping &gt; <span className="active">Payment</span>
        </nav>

        <div className="payment-confirmed-content">
          <div className="simple-checkmark">&#10004;</div>
          <p className="payment-confirmed-text">Payment Confirmed</p>
          <p className="order-number">ORDER {orderId}</p>
          <Link to="/" className="back-to-shopping-button">Back to shopping</Link>
        </div>
      </div>

      <div className="right-pane">
        {cartItems.map((item, idx) => (
          <div className="item-summary" key={idx}>
            <img src={item.image} alt={item.name} className="item-image" />
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

export default PaymentConfirmed;
