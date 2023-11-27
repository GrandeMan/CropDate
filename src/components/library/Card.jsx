import { Link } from "react-router-dom";

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

export default Card;
