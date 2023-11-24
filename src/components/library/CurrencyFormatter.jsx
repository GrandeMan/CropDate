const currencies = {
	USD: "en-US",
	EUR: "de-DE",
	GBP: "en-GB",
	TTD: "en-TT",
	JMD: "en-JM",
	GYD: "en-GY",
	BBD: "en-BB",
	XCD: "en-GD",
};

const CurrencyFormatter = ({ value, currency }) => {
	const formatter = new Intl.NumberFormat(currencies[currency], {
		style: "currency",
		currency: currency,
	});

	return <span>{formatter.format(value)}</span>;
};

const CurrencySelector = ({ onSelectCurrency }) => {
	const [selectedCurrency, setSelectedCurrency] = useState("TTD");

	const handleCurrencyChange = (e) => {
		const newCurrency = e.target.value;
		setSelectedCurrency(newCurrency);
		onSelectCurrency(newCurrency);
	};

	return (
		<select value={selectedCurrency} onChange={handleCurrencyChange}>
			{Object.keys(currencies).map((currency) => (
				<option key={currency} value={currency}>
					{currency}
				</option>
			))}
		</select>
	);
};

const App = () => {
	const [selectedCurrency, setSelectedCurrency] = useState("TTD");

	const handleCurrencyChange = (newCurrency) => {
		setSelectedCurrency(newCurrency);
	};

	return (
		<div>
			<CurrencySelector onSelectCurrency={handleCurrencyChange} />
			{data.map((item, index) => (
				<div key={index}>
					{item.commodity}:{" "}
					<CurrencyFormatter
						value={item.price}
						currency={selectedCurrency}
					/>
				</div>
			))}
		</div>
	);
};

export default App;
