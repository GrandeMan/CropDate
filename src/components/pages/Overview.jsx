import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StarIcon, TableCellsIcon } from "@heroicons/react/20/solid";
import CurrencySelector from "../library/CurrencySelector";

const today = new Date();
const time = today.getHours();
const greeting =
	time < 12 ? "Good Morning" : time < 18 ? "Good Afternoon" : "Good Evening";

const items = [
	{
		name: "My Crops",
		description: "View your tracked crops.",
		href: "/crops/my-crops",
		icon: StarIcon,
	},
	{
		name: "All Crops",
		description: "View all of the crops available.",
		href: "/crops",
		icon: TableCellsIcon,
	},
];

const Card = ({ item }) => {
	const Icon = item.icon;

	return (
		<Link to={item.href}>
			<div className="bg-white overflow-hidden shadow rounded-lg p-4">
				<div className="flex items-center">
					<div className="flex-shrink-0">
						<Icon
							className="h-6 w-6 fill-green-500"
							aria-hidden="true"
						/>
					</div>
					<div className="ml-4 flex flex-col">
						<div className="text-lg font-medium text-gray-900">
							{item.name}
						</div>
						<div className="text-sm text-gray-500 truncate">
							{item.description}
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

const Overview = ({ currentUser }) => {
	return (
		<>
			<header className="bg-white shadow">
				<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex">
					<h1 className="text-3xl font-bold tracking-tight text-gray-900">
						Overview
					</h1>
				</div>
			</header>
			<main>
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex-col gap-4">
					<h2 className="text-2xl font-bold tracking-tight text-gray-900">
						{greeting}
						{currentUser != "Guest" ? `, ${currentUser}` : ""} !
					</h2>
					<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						{items.map((item) => (
							<Card key={item.name} item={item} />
						))}
					</div>
				</div>
			</main>
		</>
	);
};

export default Overview;
