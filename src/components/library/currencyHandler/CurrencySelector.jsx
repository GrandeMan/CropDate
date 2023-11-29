import { useCurrency } from "./CurrencyProvider";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const currencies = {
  TTD: "en-TT", // Trinidad and Tobago Dollar (default)
  USD: "en-US", // United States Dollar
  CAD: "en-CA", // Canadian Dollar
  EUR: "de-DE", // Euro
  GBP: "en-GB", // British Pound Sterling
  JMD: "en-JM", // Jamaican Dollar
  GYD: "en-GY", // Guyanaese Dollar
  BBD: "en-BB", // Barbadian Dollar
  XCD: "en-GD", // East Caribbean Dollar
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CurrencySelector = () => {
  const { selectedCurrency, handleCurrencyChange } = useCurrency();

  const handleSelectChange = (e) => {
    const newCurrency = e.target.value;
    // console.log("New Currency:", newCurrency);
    handleCurrencyChange(newCurrency);
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="group inline-flex items-center justify-center text-md font-medium text-gray-700 hover:text-gray-900">
          {selectedCurrency}
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
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
        <Menu.Items className="absolute z-10 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {Object.keys(currencies).map((currency) => (
              <Menu.Item key={currency}>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-2 py-1 text-sm",
                    )}
                    onClick={() => {
                      // console.log("Clicked:", currency);
                      handleCurrencyChange(currency);
                    }}
                  >
                    {currency}
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default CurrencySelector;
