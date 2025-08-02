import "./CartPage.css";
import { useContext } from "react";
import { CartContent } from "../CartContent/CartContent";
import { Link } from "react-router-dom";
import { CurrencyContext } from "../Currency"; 

export default function CartPage() {
  const { cartItems, updateQty } = useContext(CartContent);

  const totalQuantity = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice   = cartItems.reduce((s, i) => s + i.quantity * i.price, 0);
  const { currency, convert } = useContext(CurrencyContext);


  if (cartItems.length === 0)
    return (
      <div className="cart-page">
        <h2>CART</h2>
        <p>Your cart is empty.</p>
      </div>
    );

  return (
    <div className="cart-page">
      <h2>CART</h2>

      {cartItems.map((item) => (
        <div key={`${item.id}-${item.selectedSize}`} className="cart-item">
          <div className="item-info">
            <h3>{item.brand}</h3>
            <p className="item-name">{item.title}</p>
            <p className="item-price">${item.price.toFixed(2)}</p>

            <div className="sizes">
              <p>SIZE:</p>
              <span className="size-selected">{item.selectedSize}</span>
            </div>
          </div>

          <div className="item-actions">
            <button onClick={() => updateQty(item.id, item.selectedSize, 1)}>+</button>
            <p>{item.quantity}</p>
            <button onClick={() => updateQty(item.id, item.selectedSize, -1)}>-</button>
          </div>

          <img src={item.image} alt={item.title} className="item-image" />
        </div>
      ))}

      <div className="summary">
        <p>Quantity: {totalQuantity}</p>
        <p>Total: {currency}{convert(totalPrice).toFixed(2)}</p>
        <Link to="/shippingDetails">
          <button className="continue-btn">CONTINUE</button>
        </Link>
      </div>
    </div>
  );
}
