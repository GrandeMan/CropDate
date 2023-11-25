import { useCurrency } from "./CurrencyProvider";

const currencies = {
	TTD: "en-TT", // Trinidad and Tobago Dollar (default)
	USD: "en-US", // United States Dollar
	CAD: "en-CA", // Canadian Dollar
	EUR: "de-DE", // Euro
	GBP: "en-GB", // British Pound Sterling
	JMD: "en-JM", // Jamaican Dollar
	GYD: "en-GY", // Guyanaese Dollar
	BBD: "en-BB", // Barbadian Dollar
	XCD: "en-GD", // East Caribbean Dollar
};

const CurrencySelector = () => {
	const { selectedCurrency, handleCurrencyChange } = useCurrency();

	const handleSelectChange = (e) => {
		const newCurrency = e.target.value;
		handleCurrencyChange(newCurrency);
	};

	return (
		<select value={selectedCurrency} onChange={handleSelectChange}>
			{Object.keys(currencies).map((currency) => (
				<option key={currency} value={currency}>
					{currency}
				</option>
			))}
		</select>
	);
};

export default CurrencySelector;
