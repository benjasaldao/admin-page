import { useEffect, useRef, useState } from "react";
import { updateOrderProduct } from "@services/api/orders";
import axios from "axios";
import endPoints from "@services/api";

export default function FormItem({ setOpen, setAlert, item }) {
  const formRef = useRef(null);
  const [colors, setColors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const data = {
      amount: formData.get("amount"),
      colorId: formData.get("colorId")
    };
    updateOrderProduct(item.id, data)
      .then(() => {
        setAlert({
          active: true,
          message: "Item modificado con exito",
          type: "success",
          autoClose: false,
        });
        setOpen(false);
      })
      .catch((error) => {
        setAlert({
          active: true,
          message: "Ocurrio un error al editar el item",
          type: "error",
          autoClose: false,
        });
        setOpen(false);
      });
  };

  useEffect(() => {
    async function getProduct() {
      const response = await axios.get(
        endPoints.products.getProduct(item.product.id)
      );
      setColors(response.data.colors);
    }
    try {
      getProduct();
    } catch (error) {
      console.log(error);
    }
  }, [item])

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="overflow-hidden">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Color
              </label>
              <select
                id="colorId"
                name="colorId"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {colors.map((color) => (
                    <option key={color.id} value={color.id} selected={item.color.id === color.id && "selected" }>
                      {color.name}
                    </option>
                  ))}
              </select>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Cantidad
              </label>
              <input
                defaultValue={item.amount}
                type="number"
                min="0"
                id="amount"
                name="amount"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
