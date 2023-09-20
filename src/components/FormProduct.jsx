import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { addProduct, updateProduct } from "@services/api/products";
import axios from "axios";
import endPoints from "@services/api";

export default function FormProduct({ setOpen, setAlert, product }) {
  const formRef = useRef(null);
  const router = useRouter();
  const [categories, setCategories] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);

    console.log(formData.get("image"))

    if (product) {
      updateProduct(product.id, formData).then(() => {
        router.push("/products/");
      });
    } else {
      addProduct(formData)
        .then((response) => {
          console.log(response);
          setAlert({
            active: true,
            message: "Producto añadido con exito",
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

  useEffect(() => {
    async function getCategories() {
      const response = await axios.get(endPoints.categories.getCategoriesList);
      setCategories(response.data);
    }
    try {
      getCategories();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <form ref={formRef} onSubmit={handleSubmit} encType="multipart/formdata">
      <div className="overflow-hidden">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre del producto
              </label>
              <input
                defaultValue={product?.name}
                type="text"
                name="name"
                id="name"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="col-span-6">
              <label
                htmlFor="categoryId"
                className="block text-sm font-medium text-gray-700"
              >
                Categoria
              </label>
              <select
                id="categoryId"
                name="categoryId"
                defaultValue={product?.categoryId}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Descripcion
              </label>
              <textarea
                defaultValue={product?.description}
                name="description"
                id="description"
                autoComplete="description"
                rows="3"
                className="form-textarea mt-1 block w-full mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Seleccionar imagen
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="image"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Sube una foto</span>
                        <input
                          defaultValue={product?.images}
                          id="image"
                          name="image"
                          type="file"
                          className="sr-only"
                        ></input>
                      </label>
                      <p className="pl-1">
                        o arrastrala y suelta en este cuadro
                      </p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF hasta 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Url de la imagen
              </label>
              <input
                defaultValue={product?.image}
                type="text"
                name="image"
                id="image"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div> */}
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Guardar
          </button>
        </div>
      </div>
    </form>
  );
}
