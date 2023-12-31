import Overview from "./components/pages/Overview";
import CurrencyProvider from "./components/library/currencyHandler/CurrencyProvider";
import { Fragment, useEffect, useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import MyCrops from "./components/pages/MyCrops";
import CropsIndex from "./components/library/cropsHandler/CropsIndex";
import CropDetails from "./components/pages/CropDetails";
import CropsList from "./components/pages/CropsList";
import { CropsProvider } from "./components/library/cropsHandler/CropsContext";
import { ExchangeRatesProvider } from "./components/library/currencyHandler/ExchangeRatesContext";
import { FavoritesProvider } from "./components/library/cropsHandler/FavouritesContext";

const user = {
  name: "Guest User",
  email: "https://github.com/GrandeMan",
  imageUrl:
    "https://images.unsplash.com/photo-1571680322279-a226e6a4cc2a?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};
const navigation = [
  { name: "Overview", href: "/", current: true },
  { name: "Crops", href: "/crops", current: false },
];
// const userNavigation = [
//   { name: "Your Profile", href: "#" },
//   { name: "Settings", href: "#" },
//   { name: "Sign out", href: "#" },
// ];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function App() {
  const [currentPath, setCurrentPath] = useState("/");
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 150;
      setIsScrolled(scrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-full">
      <Disclosure
        as="nav"
        className={classNames(
          "mx-0 px-4 z-50 sm:px-6 lg:px-8 fixed sm:bottom-auto xs:bottom-0",
          "bg-green-600 w-screen  transition-all duration-300",
          isScrolled ? "bg-opacity-90" : "bg-opacity-100",
        )}
      >
        {({ open }) => (
          <>
            <div>
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Link to="/">
                      <img
                        className="h-8 w-8 sm:h-10 sm:w-10"
                        style={{ filter: "brightness(0) invert(1)" }}
                        src="/leaf_6.svg"
                        alt="CropDate"
                      />
                    </Link>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            currentPath === item.href ||
                              currentPath.startsWith(`${item.href}/`)
                              ? "bg-green-900 text-white"
                              : "text-green-200 hover:bg-green-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium",
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <button
                      type="button"
                      className="relative rounded-full bg-green-800 p-1 text-green-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-green-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user.imageUrl}
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      {/* <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? "bg-gray-200" : "",
                                    "block px-4 py-2 text-sm text-gray-700",
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition> */}
                    </Menu>
                  </div>
                </div>

                <div className="-mr-2 flex md:hidden ">
                  {/* Mobile menu button */}

                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md  p-1 text-green-200 hover:bg-green-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-green-700">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-8 w-8" aria-hidden="true" />
                    ) : (
                      <Bars3Icon
                        className="block h-8 w-8 "
                        aria-hidden="true"
                      />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="opacity-0 xs:translate-y-10 sm:translate-y-[-10px]"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in-out duration-200 transform"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 xs:translate-y-10 sm:translate-y-[-10px]"
            >
              <Disclosure.Panel className="md:hidden z-50">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as={Link}
                      to={item.href}
                      className={classNames(
                        currentPath === item.href ||
                          currentPath.startsWith(`${item.href}/`)
                          ? "bg-green-900 text-white"
                          : "text-green-200 hover:bg-green-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium",
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-green-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-green-300">
                        {user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-green-800 p-1 text-green-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  {/* <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-green-300 hover:bg-green-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div> */}
                </div>
                <Disclosure.Button>
                  <div
                    className="h-screen w-screen bg-transparent fixed sm:bottom-auto xs:bottom-full"
                    onClick={() => !open}
                  />
                </Disclosure.Button>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
      <div>
        <ExchangeRatesProvider>
          <CurrencyProvider>
            <CropsProvider>
              <FavoritesProvider>
                <Routes>
                  <Route
                    path="/"
                    element={<Overview currentUser={user.name.split(" ")[0]} />}
                  />
                  <Route path="/crops" element={<CropsIndex />}>
                    <Route index element={<CropsList />} />
                    <Route path="my-crops" element={<MyCrops />} />
                    <Route path=":id" element={<CropDetails />} />
                  </Route>
                  <Route path="*" element={<h1>404</h1>} />
                </Routes>
              </FavoritesProvider>
            </CropsProvider>
          </CurrencyProvider>
        </ExchangeRatesProvider>
      </div>
    </div>
  );
}
