import { useState } from "react";
import { Tab } from "@headlessui/react";
import useCrops from "../library/useCrops";
import { Link } from "react-router-dom";
import Item from "../library/Item";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const CropsList = () => {
	const { cropsData, loading } = useCrops();
	const [selectedTab, setSelectedTab] = useState("All");

	if (loading) {
		return <p>Loading...</p>;
	}

	// Filter crops based on the selected tab
	const filteredCrops =
		selectedTab === "All"
			? cropsData
			: cropsData.filter((crop) => crop.category === selectedTab);

	return (
		<main>
			<div className="mx-auto max-w-6xl py-6 sm:px-6 lg:px-8">
				<Tab.Group>
					<Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
						<Tab
							key="All"
							className={({ selected }) =>
								classNames(
									"w-full rounded-lg py-2.5 text-sm font-medium leading-5",
									"ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
									selected
										? "bg-white text-blue-700 shadow"
										: "text-blue-100 hover:bg-white/[0.12] hover:text-white"
								)
							}
							onClick={() => setSelectedTab("All")}
						>
							All
						</Tab>
						{/* Add tabs for each category */}
						{Array.from(
							new Set(cropsData.map((crop) => crop.category))
						).map((category) => (
							<Tab
								key={category}
								className={({ selected }) =>
									classNames(
										"w-full rounded-lg py-2.5 text-sm font-medium leading-5",
										"ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
										selected
											? "bg-white text-blue-700 shadow"
											: "text-blue-100 hover:bg-white/[0.12] hover:text-white"
									)
								}
								onClick={() => setSelectedTab(category)}
							>
								{category}
							</Tab>
						))}
					</Tab.List>
					<Tab.Panels className="mt-2">
						<Tab.Panel
							key="All"
							className={classNames(
								"rounded-xl bg-white p-3",
								"ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
							)}
						>
							<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
								{filteredCrops.map((crop, id) => (
									<Link key={id} to={`/crops/${id}`}>
										<Item data={crop} />
									</Link>
								))}
							</div>
						</Tab.Panel>
						{/* Add panels for each category */}
						{Array.from(
							new Set(cropsData.map((crop) => crop.category))
						).map((category) => (
							<Tab.Panel
								key={category}
								className={classNames(
									"rounded-xl bg-white p-3",
									"ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
								)}
							>
								<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
									{filteredCrops
										.filter(
											(crop) => crop.category === category
										)
										.map((crop, id) => (
											<Link key={id} to={`/crops/${id}`}>
												<Item data={crop} />
											</Link>
										))}
								</div>
							</Tab.Panel>
						))}
					</Tab.Panels>
				</Tab.Group>
			</div>
		</main>
	);
};

export default CropsList;
