import { createContext, useContext, useState } from "react";

const CurrencyContext = createContext();

function useCurrency() {
	const context = useContext(CurrencyContext);
	if (!context) {
		throw new Error("useCurrency must be used within a CurrencyProvider");
	}
	return context;
}

// eslint-disable-next-line react/prop-types
const CurrencyProvider = ({ children }) => {
	const [selectedCurrency, setSelectedCurrency] = useState("TTD");

	const handleCurrencyChange = (newCurrency) => {
		setSelectedCurrency(newCurrency);
	};

	return (
		<CurrencyContext.Provider
			value={{ selectedCurrency, handleCurrencyChange }}
		>
			{children}
		</CurrencyContext.Provider>
	);
};

export default CurrencyProvider;
export { useCurrency };
