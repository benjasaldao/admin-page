import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Alert from '@common/Alert';
import useAlert from "@hooks/useAlert";
import Modal from "@common/Modal";
import FormColor from '@components/FormColor';
import { CheckIcon, XCircleIcon } from "@heroicons/react/solid";
import axios from 'axios';
import endPoints from '@services/api';

export default function Product() {
  const [product, setProduct] = useState({});
  const [color, setcolor] = useState({});
  const [openAddColor, setOpenAddColor] = useState(false);
  const [openUpdateColor, setOpenUpdateColor] = useState(false);
  const router = useRouter();
  const { alert, setAlert, toggleAlert } = useAlert();

  useEffect(() => {
    const { id } = router.query;
    if (!router.isReady) return;
    async function getProduct() {
      const response = await axios.get(endPoints.products.getProduct(id));
      setProduct(response.data);
    }
    getProduct();
  }, [router?.isReady, alert]);

  const handleOpenUpdateColor = (color) => {
    setcolor(color);
    setOpenUpdateColor(true);
  }

  if (product) {
    return (
        <div className="my-11 mx-3">
          <Alert alert={alert} handleClose={toggleAlert} />
          <div className="lg:flex lg:items-center lg:justify-between mb-8">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Colores del articulo {product.name}
              </h2>
            </div>
            <div className="mt-5 flex lg:mt-0 lg:ml-4">
              <span className="sm:ml-3">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setOpenAddColor(true)}
                >
                  <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  Añadir color
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
                          Color
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Id
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Edit</span>
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Delete</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {product?.colors?.map((color) => (
                        <tr key={`Product-item-${color.id}`}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={color.image}
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {color.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {color.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <span
                              className="text-indigo-600 hover:text-indigo-900 hover:pointer-cursor"
                              onClick={() => handleOpenUpdateColor(color)}
                            >
                              Edit
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <XCircleIcon
                              className="flex-shrink-0 h-6 w-6 text-gray-400 cursor-pointer"
                              aria-hidden="true"
                              onClick={() => handleDeleteColor(color)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <Modal open={openAddColor} setOpen={setOpenAddColor}>
            <FormColor setOpen={setOpenAddColor} setAlert={setAlert} product={product} />
          </Modal>
          <Modal open={openUpdateColor} setOpen={setOpenUpdateColor}>
            <FormColor setOpen={setOpenUpdateColor} setAlert={setAlert} product={product} color={color} />
          </Modal>
        </div>
      );
  }
}
