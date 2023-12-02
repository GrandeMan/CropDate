import { StarIcon, TableCellsIcon } from "@heroicons/react/20/solid";
import Card from "../library/Card";
// import CurrencySelector from "../library/CurrencySelector";

const today = new Date();
const time = today.getHours();
const greeting =
  time < 12 ? "Good Morning" : time < 18 ? "Good Afternoon" : "Good Evening";

const items = [
  {
    name: "Your Crops",
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

// eslint-disable-next-line react/prop-types
const Overview = ({ currentUser }) => {
  return (
    <>
      <header className="bg-gradient-to-b from-green-600 ">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex">
          <h1 className="text-3xl font-bold tracking-tight text-green-900 ">
            Overview
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex-col gap-4">
          <h2 className="text-2xl font-medium tracking-tight text-gray-900 py-4">
            {greeting}
            {currentUser != "Guest" ? `, ${currentUser}` : ""}!
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
