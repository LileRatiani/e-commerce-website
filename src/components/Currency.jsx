
import { createContext, useState } from "react";

export const CurrencyContext = createContext();

const rates = {
  "$": 1,      
  "€": 0.93,    
  "¥": 155.03   
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("$");

  const convert = (usdPrice) => {
    const rate = rates[currency];
    return usdPrice * rate;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convert }}>
      {children}
    </CurrencyContext.Provider>
  );
};
