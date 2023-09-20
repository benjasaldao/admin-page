import React, { useEffect, useState } from "react";
import { CheckIcon, XCircleIcon, XIcon } from "@heroicons/react/solid";
import useAlert from "@hooks/useAlert";
import Alert from "@common/Alert";
import Modal from "@common/Modal";
import { useRouter } from "next/router";
import axios from "axios";
import endPoints from "@services/api";
import { removeItem, deleteOrder } from "@services/api/orders";
import FormOrder from "@components/FormOrder";
import FormItem from "@components/FormItem";

export default function Edit() {
  const [order, setOrder] = useState({});
  const [items, setitems] = useState([]);
  const [itemToUpdate, setItemToUpdate] = useState(null);
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [openUpdateItem, setOpenUpdateItem] = useState(false);
  const { alert, setAlert, toggleAlert } = useAlert();
  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;
    if (!router.isReady) return;
    async function getOrder() {
      const response = await axios.get(endPoints.orders.getOrder(id));
      setOrder(response.data);
    }
    getOrder();
  }, [router?.isReady, alert]);

  useEffect(() => {
    const { id } = router.query;
    if (!router.isReady) return;
    async function getOrderItems() {
      const response = await axios.get(endPoints.orders.getOrderItems(id));
      setitems(response.data);
    }
    getOrderItems();
  }, [router?.isReady, alert, openAddProduct]);

  const handleDeleteItem = (id) => {
    removeItem({ id }).then(() => {
      setAlert({
        active: true,
        message: "Producto eliminado con exito",
        type: "error",
        autoClose: true,
      });
    });
  };

  const handleDeleteOrder = (id) => {
    deleteOrder(id).then(() => {
      router.push('/orders')
    });
  };

  const handleUpdateItem = (item) => {
    setItemToUpdate(item)
    setOpenUpdateItem(true);
  }


  return (
    <div className="my-11 mx-3">
      <Alert alert={alert} handleClose={toggleAlert} />
      <div className="lg:flex lg:items-center lg:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Pedido de {order?.user?.username} N° {order?.id}
          </h2>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          <span className="sm:ml-3">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 mr-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setOpenAddProduct(true)}
            >
              <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Añadir producto
            </button>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={() => handleDeleteOrder(order.id)}
            >
              <XIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Eliminar pedido
            </button>
          </span>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Producto
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Id
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Color
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Cantidad
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Modificar cantidad</span>
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Eliminar</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {items ? (
                    items.map((product) => (
                      <tr key={`item-item-${product.id}`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {product.product.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.color.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product?.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div onClick={() => handleUpdateItem(product)} className="text-indigo-600 hover:text-indigo-900 cursor-pointer">
                            Modificar Item
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <XCircleIcon
                            className="flex-shrink-0 h-6 w-6 text-gray-400 cursor-pointer"
                            aria-hidden="true"
                            onClick={() => handleDeleteItem(product.id)}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <div>Cargando...</div>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Modal open={openAddProduct} setOpen={setOpenAddProduct}>
        <FormOrder setOpen={setOpenAddProduct} setAlert={setAlert} order={order} />
      </Modal>
      <Modal open={openUpdateItem} setOpen={setOpenUpdateItem}>
        <FormItem setOpen={setOpenUpdateItem} setAlert={setAlert} item={itemToUpdate} />
      </Modal>
    </div>
  );
}
