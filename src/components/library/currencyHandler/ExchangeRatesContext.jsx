import React, { createContext, useContext, useState, useEffect } from "react";
import getRates from "./Rates";

const ExchangeRatesContext = createContext();

export function useExchangeRates() {
  const context = useContext(ExchangeRatesContext);
  if (!context) {
    throw new Error(
      "useExchangeRates must be used within an ExchangeRatesProvider",
    );
  }
  return context;
}

export function ExchangeRatesProvider({ children }) {
  const [exchangeRates, setExchangeRates] = useState(null);

  const updateExchangeRates = async () => {
    try {
      const response = await getRates();
      setExchangeRates(response);
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
    }
  };

  // Fetch exchange rates when the component mounts
  useEffect(() => {
    updateExchangeRates();
  }, []);

  return (
    <ExchangeRatesContext.Provider
      value={{ exchangeRates, updateExchangeRates }}
    >
      {children}
    </ExchangeRatesContext.Provider>
  );
}
