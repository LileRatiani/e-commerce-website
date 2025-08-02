import { createContext, useState } from "react";

export const ShippingInfoContext = createContext();

export const ShippingInfoProvider = ({ children }) => {
  const [shippingInfo, setShippingInfo] = useState(null);

  return (
    <ShippingInfoContext.Provider value={{ shippingInfo, setShippingInfo }}>
      {children}
    </ShippingInfoContext.Provider>
  );
};
