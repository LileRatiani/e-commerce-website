import "./navbar.css";
import logo from "./a-logo.png";
import cart from "./shopping-cart.png";
import { useState, useContext } from "react";
import { CurrencyContext } from "../Currency";
import CartOverlay from "../CartOverlay/CartOverlay";
import { CartContent } from "../CartContent/CartContent";

export default function Navbar({ onCategoryChange }) {
  const [active, setActive] = useState("Women");
  const { currency, setCurrency } = useContext(CurrencyContext);
    const { totalCount } = useContext(CartContent);
  const [overlayOpen, setOverlayOpen] = useState(false);
    const toggleOverlay = () => setOverlayOpen(prev => !prev);

  const handleClick = (category) => {
    setActive(category);
    onCategoryChange(category);
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button
          onClick={() => handleClick("Women")}
          className={active === "Women" ? "active" : ""}
        >
          WOMEN
        </button>
        <button
          onClick={() => handleClick("Men")}
          className={active === "Men" ? "active" : ""}
        >
          MEN
        </button>
        <button
          onClick={() => handleClick("Kids")}
          className={active === "Kids" ? "active" : ""}
        >
          KIDS
        </button>
      </div>

      <div className="navbar-center">
        <img src={logo} alt="logo" className="logo-icon" />
      </div>

      <div className="navbar-right">
        <select className="currency-select" value={currency} onChange={handleCurrencyChange}>
          <option value="$">$ USD</option>
          <option value="€">€ EUR</option>
          <option value="¥">¥ JPY</option>
        </select>

        <div className="cart-button" onClick={toggleOverlay}>
            <img src={cart} alt="shopping-cart" style={{ width: "25px" }} />
            {totalCount > 0 && <span className="cart-count">{totalCount}</span>}
        </div>
         {overlayOpen && <CartOverlay closeOverlay={() => setOverlayOpen(false)} />}
          {overlayOpen && (
  <>
    <div className="backdrop" onClick={() => setOverlayOpen(false)}></div>
    <CartOverlay closeOverlay={() => setOverlayOpen(false)} />
  </>
)}
      </div>
    </nav>
  );
}
