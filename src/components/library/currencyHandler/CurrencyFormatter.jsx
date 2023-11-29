import { useEffect, useState, useMemo } from "react";
import { useCurrency } from "./CurrencyProvider";
import { useExchangeRates } from "./ExchangeRatesContext";

const CurrencyFormatter = ({ value }) => {
  const { selectedCurrency } = useCurrency();
  const { exchangeRates } = useExchangeRates();
  const [convertedValue, setConvertedValue] = useState(null);

  const convertAmount = useMemo(() => {
    return async () => {
      try {
        if (!value || !exchangeRates) {
          throw new Error("Invalid value or exchange rates not available");
        }

        const baseCurrency = 1 / exchangeRates["TTD"];
        const exchangeRate = baseCurrency * exchangeRates[selectedCurrency];
        const convertedAmount = (value * exchangeRate).toFixed(2);

        setConvertedValue(convertedAmount);
      } catch (error) {
        console.log("Error converting currency:", error);
        // Handle error or set a default conversion
      }
    };
  }, [value, selectedCurrency, exchangeRates]);

  useEffect(() => {
    convertAmount();
  }, [convertAmount]);

  return (
    <span>
      {convertedValue !== null
        ? new Intl.NumberFormat(selectedCurrency, {
            style: "currency",
            currency: selectedCurrency,
          }).format(convertedValue)
        : "Loading..."}
    </span>
  );
};

export default CurrencyFormatter;
