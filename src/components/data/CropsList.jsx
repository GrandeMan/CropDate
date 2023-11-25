import { useState, useEffect } from "react";
import axios from "axios";
import CurrencyFormatter from "../library/CurrencyFormatter";
import localStorageData from "../utils/LocalStorage";

const CropsList = () => {
	const [cropsData, setCropsData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const cachedCropData = localStorageData("cropsData");
				const currentDate = new Date().toLocaleDateString();
				const cachedDate = cachedCropData
					? new Date(cachedCropData.date).toLocaleDateString()
					: null;

				if (cachedCropData && currentDate === cachedDate) {
					setCropsData(cachedCropData.data);
					setLoading(false);
				} else {
					const response = await axios.get(
						"https://agrimarketwatch.herokuapp.com/crops/daily/recent"
					);
					setCropsData(response.data);
					console.log(response.data);
					localStorageData("cropsData", response.data);
					setLoading(false);
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, []);

	if (loading) {
		return <p>Loading...</p>;
	}

	return (
		<div>
			<h1>Crops List</h1>
			<ul>
				{cropsData.map((crop, index) => (
					<li key={index}>
						{crop.category} {crop.commodity} {crop.date}{" "}
						<CurrencyFormatter value={crop.price} />
						{crop.unit} {crop.volume}
					</li>
				))}
			</ul>
		</div>
	);
};

export default CropsList;
