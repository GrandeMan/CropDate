/* eslint-disable no-mixed-spaces-and-tabs */
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import CurrencySelector from "../library/currencyHandler/CurrencySelector";
import useCrops from "../library/useCrops";
import { Link } from "react-router-dom";
import Item, { titleCase } from "../library/Item";
import Fuse from "fuse.js";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CropsList = function () {
  const [sideContentOpen, setsideContentOpen] = useState(false);
  const { cropsData, loading } = useCrops();
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [selectedTab, setSelectedTab] = useState("All Crops");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSeachOpen, setIsSearchOpen] = useState(false);

  const allCropsSorted = [...cropsData].sort((a, b) =>
    a.commodity.localeCompare(b.commodity),
  );

  const sortOptions = [
    "All Crops",
    ...Array.from(
      new Set(allCropsSorted.map((crop) => titleCase(crop.category))),
    ),
  ];

  // Filter crops based on the selected tab
  const filteredCrops = allCropsSorted
    .filter(
      (crop) =>
        selectedTab === "All Crops" ||
        crop.category === selectedTab.toLowerCase(),
    )
    .filter((crop) => {
      if (!searchTerm) return true; // Show all crops if no search term

      const fuse = new Fuse([crop], {
        keys: ["commodity"],
        threshold: 0.3,
      });
      const result = fuse.search(searchTerm);
      return result.length > 0;
    });

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white/20">
      <div>
        <Transition.Root show={sideContentOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative"
            onClose={() => {
              setsideContentOpen(false);
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
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-4/5 flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      {selectedCrop ? titleCase(selectedCrop.commodity) : ""}
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setsideContentOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-4 border-t border-gray-200">
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
                            {selectedCrop.price !== 0
                              ? `${selectedCrop.price} per ${
                                  selectedCrop.unit === "100's"
                                    ? "100's"
                                    : selectedCrop.unit.toUpperCase()
                                }`
                              : "Price not available"}
                          </p>
                        </div>
                        <div className="mt-2 border-t border-gray-200 px-4 sm:px-6">
                          <h3 className="text-md font-medium text-gray-900">
                            Volume
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {selectedCrop.volume}
                          </p>
                        </div>
                        <div className="mt-2 border-t border-gray-200 px-4 sm:px-6">
                          <h3 className="text-md font-medium text-gray-900">
                            Latest Date
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {selectedCrop.date.split(" ").slice(0, 1).join("")}
                          </p>
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

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between border-b border-gray-200 py-5">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <input
              type="text"
              id="search"
              className="block w-full border rounded-xl bg-white"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="ml-4 gap-4 flex items-center justify-between">
              <CurrencySelector />
              <Menu as="div" className="relative inline-block text-left">
                <div className="flex items-center">
                  <Menu.Button className="group inline-flex items-center justify-center text-md font-medium text-gray-700 hover:text-gray-900">
                    {selectedTab}
                    <ChevronDownIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
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
                        <Menu.Item key={category.toLowerCase()}>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm",
                              )}
                              onClick={() => setSelectedTab(category)}
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
            </div>
          </div>

          <section aria-labelledby="crops-heading" className="pb-24 pt-6">
            <h2 id="crops-heading" className="sr-only">
              Crops
            </h2>

            <div>
              {filteredCrops.map((crop, id) => (
                <Link
                  key={id}
                  onClick={() => {
                    setSelectedCrop(filteredCrops[id]);
                    setsideContentOpen(true);
                  }}
                >
                  <Item data={crop} />
                </Link>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default CropsList;
