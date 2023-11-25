import axios from "axios";

const convertCurrency = async (amount, fromCurrency, toCurrency) => {
	try {
		const response = await axios.get("/api/exchangerate");

		// Check if the response contains the expected data structure
		if (!response.data || !response.data.conversion_rates) {
			throw new Error("Invalid response format from exchange rate API");
		}

		const rates = response.data.conversion_rates;
		const baseCurrency = 1 / rates[fromCurrency];
		const exchangeRate = baseCurrency * rates[toCurrency];
		const convertedAmount = (amount * exchangeRate).toFixed(2);
		return convertedAmount;
	} catch (error) {
		console.error("Conversion error", error);
		throw new Error("Failed to convert currency");
	}
};
export default convertCurrency;
