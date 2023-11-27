import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
	ChevronDownIcon,
	FunnelIcon,
	MinusIcon,
	PlusIcon,
	Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { Tab } from "@headlessui/react";
import useCrops from "../library/useCrops";
import { Link } from "react-router-dom";
import Item from "../library/Item";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const CropsList = function () {
	const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
	const { cropsData, loading } = useCrops();
	const [selectedTab, setSelectedTab] = useState("All Crops");

	const sortOptions = [
		"All Crops",
		...Array.from(new Set(cropsData.map((crop) => crop.category))),
	].map((category) => category.charAt(0).toUpperCase() + category.slice(1));

	// Filter crops based on the selected tab
	const filteredCrops =
		selectedTab === "All Crops"
			? cropsData
			: cropsData.filter(
					(crop) => crop.category === selectedTab.toLowerCase()
			  );

	if (loading) {
		return <p>Loading...</p>;
	}

	return (
		<div className="bg-white">
			<div>
				{/* Mobile filter dialog */}
				<Transition.Root show={mobileFiltersOpen} as={Fragment}>
					<Dialog
						as="div"
						className="relative z-40 lg:hidden"
						onClose={setMobileFiltersOpen}
					>
						<Transition.Child
							as={Fragment}
							enter="transition-opacity ease-linear duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="transition-opacity ease-linear duration-300"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<div className="fixed inset-0 bg-black bg-opacity-25" />
						</Transition.Child>

						<div className="fixed inset-0 z-40 flex">
							<Transition.Child
								as={Fragment}
								enter="transition ease-in-out duration-300 transform"
								enterFrom="translate-x-full"
								enterTo="translate-x-0"
								leave="transition ease-in-out duration-300 transform"
								leaveFrom="translate-x-0"
								leaveTo="translate-x-full"
							>
								<Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
									<div className="flex items-center justify-between px-4">
										<h2 className="text-lg font-medium text-gray-900">
											Filters
										</h2>
										<button
											type="button"
											className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
											onClick={() =>
												setMobileFiltersOpen(false)
											}
										>
											<span className="sr-only">
												Close menu
											</span>
											<XMarkIcon
												className="h-6 w-6"
												aria-hidden="true"
											/>
										</button>
									</div>
									<div className="mt-4 border-t border-gray-200">
										Lorem ipsum, dolor sit amet consectetur
										adipisicing elit. Adipisci perspiciatis,
										nam minus inventore cum possimus odio
										illum esse quae impedit placeat quisquam
										doloribus eius earum cupiditate ut
										dolore cumque amet.
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition.Root>

				<main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
						<h1 className="text-4xl font-bold tracking-tight text-gray-900">
							{selectedTab}
						</h1>

						<div className="flex items-center">
							<Menu
								as="div"
								className="relative inline-block text-left"
							>
								<div>
									<Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
										Sort
										<ChevronDownIcon
											className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
											aria-hidden="true"
										/>
									</Menu.Button>
								</div>

								<Transition
									as={Fragment}
									enter="transition ease-out duration-100"
									enterFrom="transform opacity-0 scale-95"
									enterTo="transform opacity-100 scale-100"
									leave="transition ease-in duration-75"
									leaveFrom="transform opacity-100 scale-100"
									leaveTo="transform opacity-0 scale-95"
								>
									<Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
										<div className="py-1">
											{/* enter items here */}
											{sortOptions.map((category) => (
												<Menu.Item key={category}>
													{({ active }) => (
														<a
															href="#"
															className={classNames(
																active
																	? "bg-gray-100 text-gray-900"
																	: "text-gray-700",
																"block px-4 py-2 text-sm"
															)}
															onClick={() =>
																setSelectedTab(
																	category
																)
															}
														>
															{category}
														</a>
													)}
												</Menu.Item>
											))}
										</div>
									</Menu.Items>
								</Transition>
							</Menu>

							<button
								type="button"
								className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
								onClick={() => setMobileFiltersOpen(true)}
							>
								<span className="sr-only">Filters</span>
								<FunnelIcon
									className="h-5 w-5"
									aria-hidden="true"
								/>
							</button>
						</div>
					</div>

					<section
						aria-labelledby="products-heading"
						className="pb-24 pt-6"
					>
						<h2 id="products-heading" className="sr-only">
							Products
						</h2>

						<div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
							{/* Product grid */}
							<div className="lg:col-span-3">
								{filteredCrops.map((crop, id) => (
									<Link key={id} to={`/crops/${id}`}>
										<Item data={crop} />
									</Link>
								))}
							</div>
						</div>
					</section>
				</main>
			</div>
		</div>
	);
};

export default CropsList;

// const CropsList = () => {

// 	return (
// 		<main>
// 			<div className="mx-auto max-w-6xl py-6 sm:px-6 lg:px-8">
// 				<Tab.Group>
// 					<Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
// 						<Tab
// 							key="All"
// 							className={({ selected }) =>
// 								classNames(
// 									"w-full rounded-lg py-2.5 text-sm font-medium leading-5",
// 									"ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
// 									selected
// 										? "bg-white text-blue-700 shadow"
// 										: "text-blue-100 hover:bg-white/[0.12] hover:text-white"
// 								)
// 							}
// 							onClick={() => setSelectedTab("All")}
// 						>
// 							All
// 						</Tab>
// 						{/* Add tabs for each category */}
// 						{Array.from(
// 							new Set(cropsData.map((crop) => crop.category))
// 						).map((category) => (
// 							<Tab
// 								key={category}
// 								className={({ selected }) =>
// 									classNames(
// 										"w-full rounded-lg py-2.5 text-sm font-medium leading-5",
// 										"ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
// 										selected
// 											? "bg-white text-blue-700 shadow"
// 											: "text-blue-100 hover:bg-white/[0.12] hover:text-white"
// 									)
// 								}
// 								onClick={() => setSelectedTab(category)}
// 							>
// 								{category}
// 							</Tab>
// 						))}
// 					</Tab.List>
// 					<Tab.Panels className="mt-2">
// 						<Tab.Panel
// 							key="All"
// 							className={classNames(
// 								"rounded-xl bg-white p-3",
// 								"ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
// 							)}
// 						>
// 							<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
// 								{filteredCrops.map((crop, id) => (
// 									<Link key={id} to={`/crops/${id}`}>
// 										<Item data={crop} />
// 									</Link>
// 								))}
// 							</div>
// 						</Tab.Panel>
// 						{/* Add panels for each category */}
// 						{Array.from(
// 							new Set(cropsData.map((crop) => crop.category))
// 						).map((category) => (
// 							<Tab.Panel
// 								key={category}
// 								className={classNames(
// 									"rounded-xl bg-white p-3",
// 									"ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
// 								)}
// 							>
// 								<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
// 									{filteredCrops
// 										.filter(
// 											(crop) => crop.category === category
// 										)
// 										.map((crop, id) => (
// 											<Link key={id} to={`/crops/${id}`}>
// 												<Item data={crop} />
// 											</Link>
// 										))}
// 								</div>
// 							</Tab.Panel>
// 						))}
// 					</Tab.Panels>
// 				</Tab.Group>
// 			</div>
// 		</main>
// 	);
// };

// export default CropsList;
