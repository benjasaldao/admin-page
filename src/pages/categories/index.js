import { useState, useEffect } from 'react';
import { CheckIcon, XCircleIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import Modal from '@common/Modal';
import FormCategory from '@components/FormCategory';
import axios from 'axios';
import endPoints from '@services/api';
import useAlert from '@hooks/useAlert';
import Alert from '@common/Alert';
import { deleteCategory } from '@services/api/categories';

export default function Categories() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const { alert, setAlert, toggleAlert } = useAlert();

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
  }, [alert]);

  const handleDelete = (id) => {
    deleteCategory(id).then(() => {
      setAlert({
        active: true,
        message: 'Categoria borrada con exito',
        type: 'error',
        autoClose: true,
      });
    });
  };

  return (
    <div className='my-11 mx-3'>
      <Alert alert={alert} handleClose={toggleAlert} />
      <div className="lg:flex lg:items-center lg:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Lista de categorias</h2>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          <span className="sm:ml-3">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setOpen(true)}
            >
              <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Añadir categoria
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
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Id
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Editar</span>
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categories?.map((category) => (
                    <tr key={`category-item-${category.id}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={category.image} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{category.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link href={`categories/edit/${category.id}`} className="text-indigo-600 hover:text-indigo-900">
                          Editar
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <XCircleIcon className="flex-shrink-0 h-6 w-6 text-gray-400 cursor-pointer" aria-hidden="true" onClick={() => handleDelete(category.id)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen}>
        <FormCategory setOpen={setOpen} setAlert={setAlert} />
      </Modal>
    </div>
  );
}