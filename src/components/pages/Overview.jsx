// import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import CropsList from "../data/CropsList";
import CurrencySelector from "../library/CurrencySelector";

const Overview = () => {
	return (
		<>
			<header className="bg-white shadow">
				<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
					<h1 className="text-3xl font-bold tracking-tight text-gray-900">
						Overview
					</h1>
				</div>
			</header>
			<main>
				<div className="mx-auto max-w-6xl py-6 sm:px-6 lg:px-8 bg-slate-500">
					<CurrencySelector />
				</div>
			</main>
		</>
	);
};

export default Overview;
