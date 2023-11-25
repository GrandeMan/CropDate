import getRates from "../data/Rates";
import localStorageData from "../utils/LocalStorage";

const convertCurrency = async (amount, fromCurrency, toCurrency) => {
	try {
		const cachedRates = await getRates();

		// Check if cachedRates is not null
		if (!cachedRates) {
			throw new Error("Exchange rates not available");
		}

		const baseCurrency = 1 / cachedRates[fromCurrency];
		const exchangeRate = baseCurrency * cachedRates[toCurrency];
		const convertedAmount = (amount * exchangeRate).toFixed(2);

		localStorageData("lastConversion", {
			amount,
			fromCurrency,
			toCurrency,
			convertedAmount,
		});
		return convertedAmount;
	} catch (error) {
		console.error("Error converting currency:", error);
		throw new Error("Failed to convert currency");
	}
};

export default convertCurrency;
