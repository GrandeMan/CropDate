import { Link, Outlet, useResolvedPath } from "react-router-dom";

const navigation = [
  { name: "All Crops", to: "/crops", current: true },
  { name: "Your Crops", to: "/crops/my-crops", current: false },
];

function CropsIndex() {
  const resolvedPath = useResolvedPath();

  return (
    <>
      <header className="bg-gradient-to-b from-green-600">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-green-900">
            Crops
          </h1>
          <nav className="ml-10 flex items-baseline space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={`${
                  resolvedPath.pathname === item.to
                    ? "bg-gradient-to-tl from-green-700 to-green-900 text-white"
                    : "text-green-900 hover:bg-gradient-to-tl from-green-600 to-green-700 hover:text-white"
                } rounded-md px-2 py-2 text-md font-medium`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="w-full h-full">
        <Outlet />
      </main>
    </>
  );
}

export default CropsIndex;
