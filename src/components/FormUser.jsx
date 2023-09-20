import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { addUser, updateUser } from "@services/api/users";
import axios from "axios";
import endPoints from "@services/api";

export default function FormUser({ setOpen, setAlert, user }) {
  const formRef = useRef(null);
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const data = {
      username: formData.get("username"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      password: formData.get("password"),
    };
    console.log(data)
    if (user) {
      delete data.password
      updateUser(user.id, data).then(() => {
        router.push("/users/");
      });
    } else {
      addUser(data)
        .then(() => {
          setAlert({
            active: true,
            message: "Usuario añadido con exito",
            type: "success",
            autoClose: false,
          });
          setOpen(false);
        })
        .catch((error) => {
          setAlert({
            active: true,
            message: error.message,
            type: "error",
            autoClose: false,
          });
          setOpen(false);
        });
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="overflow-hidden">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre de usuario
              </label>
              <input
                defaultValue={user?.username}
                type="text"
                name="username"
                id="username"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                defaultValue={user?.email}
                type="text"
                name="email"
                id="email"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Telefono
              </label>
              <input
                defaultValue={user?.phone}
                type="text"
                name="phone"
                id="phone"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            {!user && (
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            )}

            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
