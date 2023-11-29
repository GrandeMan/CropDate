export function titleCase(str) {
  let splitStr = str.toLowerCase().split(" ");
  return splitStr
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

const Item = ({ data }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg p-4">
      <div className="flex items-center">
        <div className="ml-4 flex flex-col">
          <div className="text-lg font-medium text-gray-900">
            {titleCase(data.commodity)}
          </div>
          <div className="text-sm text-gray-500">
            {data.price !== 0
              ? `${data.price} per ${
                  data.unit === "100's" ? "100's" : data.unit.toUpperCase()
                }`
              : "Price not available"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
