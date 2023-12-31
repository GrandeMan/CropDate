import { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/outline";
import { useFavorites } from "../library/cropsHandler/FavouritesContext";
import Item from "../library/Item";
import Modal from "../library/Modal";
import { Dialog, Transition } from "@headlessui/react";
import {
  ArrowRightIcon,
  MinusIcon,
  PlusIcon,
  XMarkIcon,
  StarIcon as StarSolid,
} from "@heroicons/react/20/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import CurrencyFormatter from "../library/currencyHandler/CurrencyFormatter";
import { titleCase } from "../library/Item";
import CurrencySelector from "../library/currencyHandler/CurrencySelector";
import BarChart, { defaultOptions } from "../library/BarChart";

const MyCrops = () => {
  const {
    favoriteCrops,
    addToFavorites,
    removeFromFavorites,
    isCropFavorited,
  } = useFavorites();
  const [selectedCrop, setSelectedCrop] = useState(null); // State to store the selected crop
  const [sideContentOpen, setSideContentOpen] = useState(false); // State to manage modal visibility
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  // Function to handle click on a crop
  const handleCropClick = (crop) => {
    setSelectedCrop(crop);
    setSideContentOpen(true);
  };

  const toggleFavorite = () => {
    setModalOpen(true);
    if (isCropFavorited(selectedCrop.id)) {
      removeFromFavorites(selectedCrop.id);
    } else {
      addToFavorites(selectedCrop);
    }

    setTimeout(() => {
      setModalOpen(false);
    }, 1000);
  };

  const handleDetailsClick = () => {
    navigate(`/crops/${selectedCrop.id}`);
  };

  return (
    <>
      {favoriteCrops.length === 0 ? (
        <div className=" px-4 py-6 sm:px-6 lg:px-8 mt-40">
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
      ) : (
        <main className="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
          <section aria-labelledby="crops-heading" className="pb-24 pt-6">
            <h2 id="crops-heading" className="sr-only">
              Your Crops
            </h2>
            <div>
              <div className="flex justify-end sm:px-6 lg:px-9">
                <span className="text-lg p-1">
                  <CurrencySelector />
                </span>
              </div>
              <div className="grid grid-rows-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoriteCrops.map((crop, index) => (
                  <Link key={index} onClick={() => handleCropClick(crop)}>
                    <Item data={crop} />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}
      {/* Modal for displaying crop details */}
      {selectedCrop && (
        <Transition.Root show={sideContentOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative"
            onClose={() => {
              setSideContentOpen(false);
            }}
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
                enter="transition lg:transition-opacity ease-in-out lg:ease-linear duration-300 transform"
                enterFrom="translate-x-full lg:translate-x-0 lg:opacity-0"
                enterTo="translate-x-0 lg:opacity-100"
                leave="transition lg:transition-opacity ease-in-out lg:ease-linear duration-300 transform"
                leaveFrom="translate-x-0 lg:opacity-100"
                leaveTo="translate-x-full lg:translate-x-0 lg:opacity-0"
              >
                <Dialog.Panel className="relative rounded-lg lg:pt-4 sm:pt-16 ml-auto flex flex-col lg:fixed lg:top-28 lg:left-1/4  lg:h-3/4 lg:w-1/2 xs:h-full md:w-1/2 xs:w-3/4  overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  {/* Render when screen is large and above */}
                  {selectedCrop ? (
                    <div className="px-8 lg:flex gap-4 justify-between flex-col h-full xs:hidden">
                      <div className="flex justify-end">
                        <button
                          type="button"
                          className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                          onClick={() => setSideContentOpen(false)}
                        >
                          <span className="sr-only">Close menu</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="flex flex-cols gap-2 justify-center h-3/6">
                        <div className="w-1/2">
                          <BarChart
                            data={{
                              labels: selectedCrop?.dates.map((date) =>
                                date.slice(0, 10),
                              ),
                              datasets: [
                                {
                                  label: "Price",
                                  data: selectedCrop?.prices.slice(0, 7),
                                  backgroundColor: "rgba(255, 99, 132, 0.2)",
                                  borderColor: "rgba(255, 99, 132, 1)",
                                  borderWidth: 2,
                                  borderRadius: 2,
                                },
                              ],
                            }}
                            options={{
                              ...defaultOptions,
                              scales: {
                                y: {
                                  ...defaultOptions.scales.y,
                                  title: {
                                    ...defaultOptions.scales.y.title,
                                    text: `Price (${selectedCrop?.unit})`,
                                  },
                                },
                                x: {
                                  ...defaultOptions.scales.x,
                                  title: {
                                    ...defaultOptions.scales.x.title,
                                    text: "Date",
                                  },
                                },
                              },
                            }}
                          />
                        </div>
                        <div className="w-1/2">
                          <BarChart
                            data={{
                              labels: selectedCrop?.dates.map((date) =>
                                date.slice(0, 10),
                              ),
                              datasets: [
                                {
                                  label: "Volume",
                                  data: selectedCrop?.volumes.slice(0, 7),
                                  backgroundColor: "rgba(54, 162, 235, 0.2)",
                                  borderColor: "rgba(54, 162, 235, 1)",
                                  borderWidth: 2,
                                  borderRadius: 2,
                                },
                              ],
                            }}
                            options={{
                              ...defaultOptions,
                              scales: {
                                y: {
                                  ...defaultOptions.scales.y,
                                  title: {
                                    ...defaultOptions.scales.y.title,
                                    text: `Volume (${selectedCrop?.unit})`,
                                  },
                                },
                                x: {
                                  ...defaultOptions.scales.x,
                                  title: {
                                    ...defaultOptions.scales.x.title,
                                    text: "Date",
                                  },
                                },
                              },
                            }}
                          />
                        </div>
                      </div>
                      <div className="grid grid-rows-5 w-full h-2/6">
                        <div className="grid grid-cols-2 text-center">
                          <span className="bg-green-200 font-bold px-2 py-4 min-h-max min-w-max">
                            Category
                          </span>
                          <span className="border p-2 min-h-max min-w-max text-center">
                            {titleCase(selectedCrop.category)}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 text-center">
                          <span className="bg-green-200 font-bold px-2 py-4 min-h-max min-w-max">
                            Name
                          </span>
                          <span className="border p-2 min-h-max min-w-max text-center ">
                            {titleCase(selectedCrop.commodity)}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 text-center">
                          <span className="bg-green-200 font-bold px-2 py-4 min-h-max min-w-max">
                            Last Update
                          </span>
                          <span className="border p-2 min-h-max min-w-max text-center">
                            {selectedCrop.dates[0].slice(0, 10)}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 text-center">
                          <span className="bg-green-200 font-bold px-2 py-4 min-h-max min-w-max">
                            Price
                          </span>
                          <span className="border p-2 min-h-max min-w-max text-center">
                            {selectedCrop.prices[0] !== 0 ? (
                              <>
                                <CurrencyFormatter
                                  value={selectedCrop.prices[0]}
                                />{" "}
                                per{" "}
                                {selectedCrop.unit === "100's"
                                  ? "100's"
                                  : selectedCrop.unit.toUpperCase()}
                              </>
                            ) : (
                              "Price not available"
                            )}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 text-center">
                          <span className="bg-green-200 font-bold px-2 py-4 min-h-max min-w-max">
                            Volume Sold ({selectedCrop.unit})
                          </span>
                          <span className="border p-2 min-h-max min-w-max text-center">
                            {selectedCrop.volumes[0]}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <button
                          type="button"
                          onClick={toggleFavorite}
                          className="flex items-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                        >
                          {isCropFavorited(selectedCrop.id) ? (
                            <MinusIcon
                              className="-ml-0.5 mr-1.5 h-5 w-5 stroke-white"
                              aria-hidden="true"
                            />
                          ) : (
                            <PlusIcon
                              className="-ml-0.5 mr-1.5 h-5 w-5 stroke-white"
                              aria-hidden="true"
                            />
                          )}
                          {isCropFavorited(selectedCrop.id)
                            ? "Remove from your list"
                            : "Add to your list"}
                        </button>
                      </div>
                      {modalOpen && (
                        <Modal
                          icon={
                            isCropFavorited(selectedCrop.id) ? (
                              <StarSolid className="h-10 w-10 text-green-500" />
                            ) : (
                              <StarOutline className="h-10 w-10 text-green-500" />
                            )
                          }
                          text={
                            isCropFavorited(selectedCrop.id)
                              ? "Added to your list"
                              : "Removed from your list"
                          }
                        />
                      )}
                    </div>
                  ) : (
                    <p>Select a crop to view details</p>
                  )}
                  {/* Render when screen is less than large */}
                  <div className="flex items-center justify-between px-4 lg:hidden">
                    <h2 className="text-lg font-medium text-gray-900">
                      {selectedCrop ? titleCase(selectedCrop.commodity) : ""}
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setSideContentOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-4 border-t border-gray-200 lg:hidden">
                    {/* Display crop details */}
                    {selectedCrop ? (
                      <>
                        <div className="px-4 sm:px-6">
                          <h3 className="text-md font-medium text-gray-900">
                            Category
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {titleCase(selectedCrop.category)}
                          </p>
                        </div>
                        <div className="mt-2 border-t border-gray-200 px-4 sm:px-6">
                          <h3 className="text-md font-medium text-gray-900">
                            Latest Price
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {selectedCrop.prices[0] !== 0 ? (
                              <>
                                <CurrencyFormatter
                                  value={selectedCrop.prices[0]}
                                />{" "}
                                per{" "}
                                {selectedCrop.unit === "100's"
                                  ? "100's"
                                  : selectedCrop.unit.toUpperCase()}
                              </>
                            ) : (
                              "Price not available"
                            )}
                          </p>
                        </div>
                        <div className="mt-2 border-t border-gray-200 px-4 sm:px-6">
                          <h3 className="text-md font-medium text-gray-900">
                            Volume Sold ({selectedCrop.unit})
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {selectedCrop.volumes[0]}
                          </p>
                        </div>
                        <div className="mt-2 border-t border-gray-200 px-4 sm:px-6">
                          <h3 className="text-md font-medium text-gray-900">
                            Last Update
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {selectedCrop.dates[0].slice(0, 10)}
                          </p>
                        </div>
                        <div className="grid md:grid-cols-2 xs:grid-cols-1 xs:grid-rows-2 gap-4 mt-4 px-2">
                          <button
                            type="button"
                            onClick={toggleFavorite}
                            className="flex items-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                          >
                            {isCropFavorited(selectedCrop.id) ? (
                              <MinusIcon
                                className="-ml-0.5 mr-1.5 h-5 w-5 stroke-white"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusIcon
                                className="-ml-0.5 mr-1.5 h-5 w-5 stroke-white"
                                aria-hidden="true"
                              />
                            )}
                            {isCropFavorited(selectedCrop.id)
                              ? "Remove from your list"
                              : "Add to your list"}
                          </button>
                          {modalOpen && (
                            <Modal
                              icon={
                                isCropFavorited(selectedCrop.id) ? (
                                  <StarSolid className="h-10 w-10 text-green-500" />
                                ) : (
                                  <StarOutline className="h-10 w-10 text-green-500" />
                                )
                              }
                              text={
                                isCropFavorited(selectedCrop.id)
                                  ? "Added to your list"
                                  : "Removed from your list"
                              }
                            />
                          )}
                          <button
                            onClick={handleDetailsClick}
                            type="button"
                            className="flex items-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                          >
                            <ArrowRightIcon
                              className="-ml-0.5 mr-1.5 h-5 w-5 stroke-white"
                              aria-hidden="true"
                            />
                            View full details
                          </button>
                        </div>
                      </>
                    ) : (
                      <p>Select a crop to view details</p>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </>
  );
};

export default MyCrops;
