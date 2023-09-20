import { useRef } from "react";
import { addColor, updateColor } from "@services/api/products";

export default function FormColor({ setOpen, setAlert, product, color }) {
  const formRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const data = {
      name: formData.get("name"),
      image: formData.get("image"),
    };
    if (color) {
      updateColor(color.id, data)
        .then(() => {
          setAlert({
            active: true,
            message: "Color modificado con exito",
            type: "success",
            autoClose: false,
          });
          setOpen(false);
        })
        .catch((error) => {
          setAlert({
            active: true,
            message: "Ocurrio un error al modificar el color",
            type: "error",
            autoClose: false,
          });
          setOpen(false);
        });
    } else if (product) {
      data.productId = product.id
      addColor(data)
        .then(() => {
          setAlert({
            active: true,
            message: "Color añadido con exito",
            type: "success",
            autoClose: false,
          });
          setOpen(false);
        })
        .catch((error) => {
          setAlert({
            active: true,
            message: "Ocurrio un error al añadir el color",
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
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                defaultValue={color?.name}
              ></input>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Url de la imagen
              </label>
              <input
                type="text"
                id="image"
                name="image"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                defaultValue={color?.image}
              />
            </div>
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
