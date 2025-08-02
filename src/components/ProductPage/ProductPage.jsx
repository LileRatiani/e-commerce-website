import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import data from "../clothesData.json";
import "./ProductPage.css";
import { CartContent } from "../CartContent/CartContent";
import { CurrencyContext } from "../Currency";

export default function ProductPage() {
  const { id } = useParams();
  const product = data.find((p) => p.id === parseInt(id));
  const { addToCart } = useContext(CartContent);
  const { currency, convert } = useContext(CurrencyContext);

  const [selectedSize, setSelectedSize] = useState(null);
  const [showError, setShowError] = useState(false);
  const [mainImage, setMainImage] = useState(product?.img); 

  if (!product) return <p>Product not found.</p>;

  const [name, ext] = product.img.split(/\.(?=[^.]+$)/); 
  const thumbnails = [
    product.img,
    `${name}-2.${ext}`,
    `${name}-3.${ext}`
  ];

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowError(true);
      return;
    }

    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: mainImage,
      selectedSize,
    });

    setShowError(false);
  };

  return (
    <div className="product-page">
      <div className="left-column">

        <div className="thumbnail-list">
          {thumbnails.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Thumbnail ${i + 1}`}
              className={`thumbnail ${src === mainImage ? "active" : ""}`}
              onClick={() => setMainImage(src)}
            />
          ))}
        </div>

        <div className="main-image">
          <img src={mainImage} alt={product.title} />
        </div>
      </div>

      <div className="right-column">
        <h2 className="title">{product.title.split(" ")[0]}</h2>
        <p className="subtitle">{product.title.split(" ").slice(1).join(" ")}</p>

        <p className="label">SIZE:</p>
        <div className="sizes">
          {["XS", "S", "M", "L"].map((size, index) => (
            <button
              key={index}
              className={`size-button ${selectedSize === size ? "selected" : ""}`}
              onClick={() => {
                setSelectedSize(size);
                setShowError(false);
              }}
            >
              {size}
            </button>
          ))}
        </div>
        {showError && <p className="error-msg">Please select a size</p>}

        <p className="label">PRICE:</p>
        <p>{currency}{convert(product.price).toFixed(2)}</p>

        <button className="add-to-cart" onClick={handleAddToCart}>
          ADD TO CART
        </button>

        <p className="description">
          Find stunning women's cocktail dresses and party dresses. Stand out in lace
          and metallic cocktail dresses and party dresses from all your favorite brands.
        </p>
      </div>
    </div>
  );
}
