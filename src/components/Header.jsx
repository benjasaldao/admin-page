/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect } from "react";
import { Popover, Transition, Menu } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useAuth } from "@hooks/useAuth";
import Router from "next/router";
import Link from "next/link";

const Header = () => {
  const auth = useAuth();

  useEffect(() => {
    auth
      .checkCookies()
      .then((isAuth) => {
        if (!isAuth) {
          Router.push("/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userData = {
    name: auth?.user?.username,
    imageUrl: `https://ui-avatars.com/api/?name=${auth?.user?.username}`,
  };

  if (auth.user) {
    return (
      <Popover className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link href="/">
                <a href="">
                  <span className="sr-only">Workflow</span>
                  <img
                    className="h-8 w-auto sm:h-10"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt=""
                  />
                </a>
              </Link>
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <Popover.Group
              as="nav"
              className="hidden md:flex items-center space-x-10"
            >
              <Link href="/products">
                <a className="text-gray-500 hover:text-gray-900">Productos</a>
              </Link>

              <Link href="/categories">
                <a className="text-gray-500 hover:text-gray-900">Categorias</a>
              </Link>

              <Link href="/users">
                <a className="text-gray-500 hover:text-gray-900">Usuarios</a>
              </Link>

              <Link href="/orders">
                <a className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                  Pedidos
                </a>
              </Link>
            </Popover.Group>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <Menu as="div" className="ml-3 relative">
                <div>
                  <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={userData.imageUrl}
                      alt=""
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
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <button
                      onClick={() => auth.logout()}
                      className="block px-4 py-2 text-sm text-gray-700"
                    >
                      Logout
                    </button>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
          >
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
              <div className="pt-5 pb-6 px-5">
                <div className="flex items-center justify-between">
                  <div>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                      alt="Workflow"
                    />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-8">
                    <Link href="/products">
                      <a className="text-gray-500 hover:text-gray-900">
                        Productos
                      </a>
                    </Link>

                    <Link href="/categories">
                      <a className="text-gray-500 hover:text-gray-900">
                        Categorias
                      </a>
                    </Link>

                    <Link href="/orders">
                      <a className="text-gray-500 hover:text-gray-900">
                        Pedidos
                      </a>
                    </Link>

                    <Link href="/users">
                      <a className="text-gray-500 hover:text-gray-900">
                        Usuarios
                      </a>
                    </Link>
                  </nav>
                </div>
              </div>
              <div className="py-6 px-5 space-y-6">
                <div className="flex justify-center">
                  <a
                    onClick={() => auth.logout()}
                    className="w-4/5 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Cerrar sesion
                  </a>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    );
  } else {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="#">
              <span className="sr-only">Workflow</span>
              <img
                className="h-8 w-auto sm:h-10"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt=""
              />
            </a>
          </div>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <Link href="/login" passHref>
              <div className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                Iniciar sesion
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default Header;
