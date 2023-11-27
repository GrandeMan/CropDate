import { Link, Outlet, useResolvedPath } from "react-router-dom";

const navigation = [
	{ name: "All Crops", to: "/crops", current: true },
	{ name: "My Crops", to: "/crops/my-crops", current: false },
];

function CropsIndex() {
	const resolvedPath = useResolvedPath();

	return (
		<>
			<header className="bg-white shadow">
				<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between">
					<h1 className="text-3xl font-bold tracking-tight text-gray-900">
						Crops
					</h1>
					<nav className="ml-10 flex items-baseline space-x-4">
						{navigation.map((item) => (
							<Link
								key={item.name}
								to={item.to}
								className={`${
									resolvedPath.pathname === item.to
										? "bg-gray-900 text-white"
										: "text-gray-300 hover:bg-gray-700 hover:text-white"
								} rounded-md px-3 py-2 text-sm font-medium`}
							>
								{item.name}
							</Link>
						))}
					</nav>
				</div>
			</header>
			<main>
				<div className="mx-auto max-w-6xl py-6 sm:px-6 lg:px-8 bg-slate-500">
					<Outlet />
				</div>
			</main>
		</>
	);
}

export default CropsIndex;
