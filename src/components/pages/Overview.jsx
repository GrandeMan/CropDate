import {
  ChevronUpIcon,
  StarIcon,
  TableCellsIcon,
} from "@heroicons/react/20/solid";
import Card from "../library/Card";
import { Disclosure } from "@headlessui/react";
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
    <div className="h-full">
      <header className="bg-gradient-to-b from-green-600 ">
        <div className=" px-4 py-6 sm:px-6 lg:px-8 flex">
          <h1 className="text-3xl font-bold tracking-tight text-green-900 ">
            Overview
          </h1>
        </div>
      </header>
      <main className="h-full flex flex-col">
        <div className=" px-4 sm:px-6 lg:px-8 flex-col gap-4">
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
        <div className="relative top-20 lg:grid lg:grid-cols-2">
          <div className=" px-4 sm:px-6 lg:px-8 flex-col gap-4">
            <Disclosure as="div" className="mt-2">
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between items-center rounded-lg bg-green-200 px-4 py-2 text-left text-lg font-medium text-green-900 hover:bg-green-300 focus:outline-none focus-visible:ring focus-visible:ring-green-500/75">
                    <span>About</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-green-600`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pb-4 pt-4 text-sm text-gray-500">
                    CropDate is designed to help users keep track of the
                    wholesale prices of crops in Trinidad and Tobago. You can
                    view all crops available and search for specific crops. You
                    can also favourite crops to keep track of them.
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
          <div className=" px-4 sm:px-6 lg:px-8 flex-col gap-4">
            <Disclosure as="div" className="mt-2">
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between items-center rounded-lg bg-green-200 px-4 py-2 text-left text-lg font-medium text-green-900 hover:bg-green-300 focus:outline-none focus-visible:ring focus-visible:ring-green-500/75">
                    <span>Disclaimer</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-green-600`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pb-16 pt-4 text-sm text-gray-500">
                    This app is for educational purposes only. The information
                    contained in this app is for general information purposes
                    only. The information is provided by {"NAMISTT"} and while I
                    endeavour to keep the information up to date and correct, I
                    make no representations or warranties of any kind, express
                    or implied, about the completeness, accuracy, reliability,
                    suitability or availability with respect to the app or the
                    information, products, services, or related graphics
                    contained on the app for any purpose. Any reliance you place
                    on such information is therefore strictly at your own risk.
                    <br />
                    <br />
                    <a
                      className="text-m font-medium"
                      href="https://www.namistt.com/"
                    >
                      Visit NAMISTT
                    </a>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Overview;
