import { Link } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/outline";
import { useFavorites } from "../library/cropsHandler/FavouritesContext";

const MyCrops = () => {
  const { favoriteCrops } = useFavorites();

  return (
    <>
      {favoriteCrops.length === 0 ? (
        <div className=" px-4 py-6 sm:px-6 lg:px-8 mt-40">
          <div className="flex flex-col">
            <div className="flex flex-col items-center justify-center text-center">
              <StarIcon className="h-20 w-20 opacity-10" />
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                List empty
              </h1>
              <p className="mt-6 text-base leading-7 text-gray-600">
                Your list is currently empty. Add some crops to your list.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  to={"/crops"}
                  className="rounded-md bg-green-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
                >
                  View all crops
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <main className="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
          <p>Your favorite crops:</p>
          <ul>
            {console.log("favoriteCrops", favoriteCrops)}
            {favoriteCrops.map((crop, index) => (
              <li key={index}>{crop.commodity}</li>
            ))}
          </ul>
        </main>
      )}
    </>
  );
};

export default MyCrops;
