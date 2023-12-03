import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FocusTrap } from "@headlessui/react";

const Modal = ({ icon, text }) => {
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <button aria-hidden className="fixed inset-0 bg-transparent" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="fixed sm:top-3/4 xs:top-10 flex gap-4 items-center justify-center max-w-md overflow-hidden rounded-2xl bg-slate-100/95 p-6  shadow-xl ">
                  {/* Use JSX syntax for rendering icons */}
                  <span className="opacity-40">{icon}</span>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-700/90"
                  >
                    {text}
                  </Dialog.Title>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
