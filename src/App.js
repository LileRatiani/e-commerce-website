import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx"
import Main from "./components/Main/Main.jsx"
import  { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductPage from "./components/ProductPage/ProductPage.jsx";
import CartPage from "./components/CartPage/CartPage.jsx";
import ShippingDetails from "./components/ShippingDetails/ShippingDetails.jsx";
import ShippingPage from "./components/ShippingPage/ShippingPage.jsx"
import PaymentPage from "./components/PaymentPage/PaymentPage.jsx"
import PaymentConfirmed from "./components/PaymentConfirmed/PaymentConfirmed.jsx";
import { ShippingInfoProvider } from "./components/ShippingInfoContext.jsx";




function App() {
  const [category, setCategory] = useState("Women");
  const [overlayOpen, setOverlayOpen] = useState(false);
  return (

     <Router>
      <div className="App">
        <Navbar onCategoryChange={setCategory}  overlayOpen={overlayOpen}
  setOverlayOpen={setOverlayOpen} />
        <div className="Main-part">
              <ShippingInfoProvider>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <h1 style={{ textTransform: "uppercase" }}>{category} Category</h1>
                  <div className={overlayOpen ? "content faded" : "content"}>
                  <Main category={category} overlayOpen={overlayOpen}/>
                  </div>
                </>
              }
            />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage/>}></Route>
            <Route path="/shippingDetails" element={<ShippingDetails/>}></Route>
            <Route path="/shipping" element={<ShippingPage/>}></Route>
            <Route path="/payment" element={<PaymentPage/>}></Route>
            <Route path="/confirmed" element={<PaymentConfirmed/>}></Route>
          </Routes>
              </ShippingInfoProvider>
        </div>
      </div>
    </Router>

  );
}

export default App;
