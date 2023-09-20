import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { addItem, addOrder } from "@services/api/orders";
import axios from "axios";
import endPoints from "@services/api";

export default function FormOrder({ setOpen, setAlert, order }) {
  const formRef = useRef(null);
  const productSelectRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [colors, setColors] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const response = await axios.get(endPoints.products.getAllProducts);
      setProducts(response.data);
    }
    try {
      getProducts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    async function getUsers() {
      const response = await axios.get(endPoints.users.getUsers);
      setUsers(response.data);
    }
    try {
      getUsers();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    if (order) {
      const data = {
        orderId: order.id,
        productId: formData.get("productId"),
        colorId: formData.get("colorId"),
        amount: parseInt(formData.get("amount")),
      };
      addItem(data)
        .then(() => {
          setOpen(false);
        })
        .catch((error) => console.log(error));
    } else {
      const data = {
        userId: formData.get("userId"),
      };
      addOrder(data)
        .then(() => {
          setAlert({
            active: true,
            message: "Pedido creado con exito",
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

  const handleSetColors = () => {
    const productId = productSelectRef.current.value;
    
    if (productId) {
      async function getProduct() {
        const response = await axios.get(
          endPoints.products.getProduct(productId)
        );
        setColors(response.data.colors);
      }
      try {
        getProduct();
      } catch (error) {
        console.log(error);
      }
    } else {
      setColors([])
    }
  };

  if (order) {
    return (
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="overflow-hidden">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="productId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Producto
                </label>
                <select
                  id="productId"
                  name="productId"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  ref={productSelectRef}
                  onChange={() => handleSetColors()}
                >
                  <option value="">-- Seleccionar un producto --</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="colorId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Color
                </label>
                <select
                  id="colorId"
                  name="colorId"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {colors?.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cantidad
                </label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  min="0"
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
  } else {
    return (
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="overflow-hidden">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="userId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cliente
                </label>
                <select
                  id="userId"
                  name="userId"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.username}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Crear Pedido
            </button>
          </div>
        </div>
      </form>
    );
  }
}
