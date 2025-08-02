import "./ShippingDetails.css";
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShippingInfoContext } from "../ShippingInfoContext";
import { CartContent } from "../CartContent/CartContent";
import { CurrencyContext } from "../Currency";

const ShippingDetails = () => {
  const navigate = useNavigate();
  const { setShippingInfo } = useContext(ShippingInfoContext);
  const { cartItems } = useContext(CartContent);
  const { currency, convert } = useContext(CurrencyContext);

  const [formData, setFormData] = useState({
    contact: '',
    name: '',
    surname: '',
    address: '',
    note: '',
    city: '',
    postalCode: '',
    province: '',
    country: 'Italy',
    saveInfo: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { contact, name, surname, address, city, postalCode, province } = formData;

    if (!contact || !name || !surname || !address || !city || !postalCode || !province) {
      alert("Please fill in all required fields.");
      return;
    }

    setShippingInfo(formData);
    navigate("/shipping");
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingMethod = "standard"; 
  const shippingCost = shippingMethod === "express" ? 4.99 : 0;
  const total = subtotal + shippingCost;

  return (
    <div className="details-page">
      <div className="form-section">
        <nav className="breadcrumbs">
          <span className="link">Cart</span> &gt; <span className="active">Details</span> &gt; Shipping &gt; Payment
        </nav>

        <h3>Contact</h3>
        <input
          type="text"
          name="contact"
          placeholder="Email or mobile phone number"
          value={formData.contact}
          onChange={handleChange}
          required
        />

        <h3>Shipping Address</h3>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="surname"
              placeholder="Second Name"
              value={formData.surname}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="text"
            name="address"
            placeholder="Address and number"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="note"
            placeholder="Shipping note (optional)"
            value={formData.note}
            onChange={handleChange}
          />

          <div className="row">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
            <select
              name="province"
              value={formData.province}
              onChange={handleChange}
              required
            >
              <option value="">Province</option>
              <option value="MI">MI</option>
              <option value="RM">RM</option>
            </select>
          </div>

          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          >
            <option value="Italy">Italy</option>
            <option value="Germany">Germany</option>
          </select>

          <div className="checkbox">
            <input
              type="checkbox"
              name="saveInfo"
              checked={formData.saveInfo}
              onChange={handleChange}
            />
            <label>Save this information for a future fast checkout</label>
          </div>

          <div className="actions">
            <Link to="/cart" className="cart-link">
              <button type="button" className="back">Back to cart</button>
            </Link>
            <button type="submit" className="next">Go to shipping</button>
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

export default ShippingDetails;
