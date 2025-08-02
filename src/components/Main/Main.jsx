import "./Main.css";
import data from "../clothesData.json";
import ProductCard from "../ProductCard/ProductCard";
import { CurrencyContext } from "../Currency";
import { useContext } from "react";

export default function Main({ category, overlayOpen }) {
  const { currency } = useContext(CurrencyContext);

  const filtered = category 
    ? data.filter(item => item.category === category)
    : data;

  return (
    <div className="main-div">
      {filtered.length > 0 ? (
        filtered.map(item => (
          <ProductCard
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            image={item.img} 
            inStock={item.inStock}
            currency={currency}
          />
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}
