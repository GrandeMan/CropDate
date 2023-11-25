import { useEffect, useState } from "react";
import { useCurrency } from "./CurrencyProvider";
import convertCurrency from "./CurrencyConverter";

const CurrencyFormatter = ({ value }) => {
	const { selectedCurrency } = useCurrency();
	const [convertedValue, setConvertedValue] = useState(null);

	useEffect(() => {
		const convertAmount = async () => {
			try {
				const convertedAmount = await convertCurrency(
					value,
					"TTD",
					selectedCurrency
				);
				setConvertedValue(convertedAmount);
			} catch (error) {
				console.log("Error converting currency:", error);
			}
		};

		convertAmount();
	}, [value, selectedCurrency]);

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
