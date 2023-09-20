import { useState, useEffect } from "react";
import { CheckIcon } from "@heroicons/react/solid";
import Link from "next/link";
import Modal from "@common/Modal";
import FormOrder from "@components/FormOrder";
import axios from "axios";
import endPoints from "@services/api";
import useAlert from "@hooks/useAlert";
import Alert from "@common/Alert";
import Search from "@components/Search";
import Table from "@components/Table";

export default function Orders() {
  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const { alert, setAlert, toggleAlert } = useAlert();

  useEffect(() => {
    async function getOrders() {
      const response = await axios.get(endPoints.orders.getAllOrders);
      setOrders(response.data);
    }
    try {
      getOrders();
    } catch (error) {
      console.log(error);
    }
  }, [alert]);

  const handleSearch = (list, query) => {
    const results = list.filter(order => order.user.username.includes(query))
    return results
  }

  return (
    <div className="my-11 mx-3">
      <Alert alert={alert} handleClose={toggleAlert} />

      <div className="flex flex-col md:justify-between md:items-center md:flex-row ">
        <div className="lg:flex lg:items-center lg:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Lista de pedidos
            </h2>
          </div>
          <div className="mt-5 flex lg:mt-0 lg:ml-4">
            <span className="sm:ml-3">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setOpen(true)}
              >
                <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Crear pedido
              </button>
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <Search list={orders} handleSearch={handleSearch}>
                <Table element="orders" />
              </Search>
            </div>
          </div>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen}>
        <FormOrder setOpen={setOpen} setAlert={setAlert} />
      </Modal>
    </div>
  );
}
