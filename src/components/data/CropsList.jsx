import { useState, useEffect } from "react";
import axios from "axios";
import CurrencyFormatter from "../library/CurrencyFormatter";

const CropsList = () => {
	// const [cropsData, setCropsData] = useState([]);
	// const [loading, setLoading] = useState(true);

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			const response = await axios.get(
	// 				"https://agrimarketwatch.herokuapp.com/crops/daily/recent"
	// 			);
	// 			setCropsData(response.data);
	// 			// console.log(response.data);
	// 			setLoading(false);
	// 		} catch (error) {
	// 			console.error("Error fetching data:", error);
	// 		}
	// 	};

	// 	fetchData();
	// }, []);

	// if (loading) {
	// 	return <p>Loading...</p>;
	// }

	let tempData = [
		{
			category: "root crops",
			commodity: "yam (local)",
			date: "2023-11-20 00:00:00",
			price: 0.0,
			unit: "kg",
			volume: 0.0,
		},
		{
			category: "root crops",
			commodity: "yam (imported)",
			date: "2023-11-20 00:00:00",
			price: 0.0,
			unit: "kg",
			volume: 0.0,
		},
		{
			category: "root crops",
			commodity: "dasheen(local)",
			date: "2023-11-20 00:00:00",
			price: 13.89,
			unit: "kg",
			volume: 756.0,
		},
		{
			category: "root crops",
			commodity: "dasheen(imported)",
			date: "2023-11-20 00:00:00",
			price: 6.67,
			unit: "kg",
			volume: 360.0,
		},
		{
			category: "root crops",
			commodity: "eddoe (local)",
			date: "2023-11-20 00:00:00",
			price: 0.0,
			unit: "kg",
			volume: 0.0,
		},
		{
			category: "root crops",
			commodity: "eddoe (imported)",
			date: "2023-11-20 00:00:00",
			price: 0.0,
			unit: "kg",
			volume: 0.0,
		},
		{
			category: "condiments and spices",
			commodity: "celery",
			date: "2023-11-20 00:00:00",
			price: 120.0,
			unit: "bndl.",
			volume: 150.0,
		},
		{
			category: "condiments and spices",
			commodity: "chive (l)",
			date: "2023-11-20 00:00:00",
			price: 50.0,
			unit: "bndl.",
			volume: 330.0,
		},
		{
			category: "condiments and spices",
			commodity: "thyme (s)",
			date: "2023-11-20 00:00:00",
			price: 80.0,
			unit: "bndl.",
			volume: 32.0,
		},
	];

	return (
		<div>
			<h1>Crops List</h1>
			{/* <ul>
				{cropsData.map((crop, index) => (
					<li key={index}>
						{crop.category} {crop.commodity} {crop.date}{" "}
						{crop.price} {crop.unit} {crop.volume}
					</li>
				))}
			</ul> */}
			<ul>
				{tempData.map((crop, index) => (
					<li key={index}>
						<h2 className="text-3xl font-bold underline">
							{crop.category}
						</h2>
						<p>{crop.commodity}</p>
						{crop.date}
						<CurrencyFormatter value={crop.price} />
						{crop.unit} {crop.volume}
					</li>
				))}
			</ul>
		</div>
	);
};

export default CropsList;
