const Item = ({ data }) => {
	return (
		<div className="bg-white overflow-hidden shadow rounded-lg p-4">
			<div className="flex items-center">
				<div className="ml-4 flex flex-col">
					<div className="text-lg font-medium text-gray-900">
						{data.commodity}
					</div>
					<div className="text-sm text-gray-500">
						Price: ${data.price} per {data.unit}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Item;
