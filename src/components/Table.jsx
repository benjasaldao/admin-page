import Link from "next/link";

const Table = ({ items, element }) => {
  if (JSON.stringify(items) !== "[]") {
    const keys = Object.keys(items[0]);
    return (
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {keys.map((key, index) => {
              return (
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  key={index}
                >
                  {key}
                </th>
              );
            })}
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Editar</span>
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Eliminar</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items?.map((item) => {
            return (
              <tr key={`category-item-${item.id}`}>
                {keys.map((key) => (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {typeof item[key] === "object" ? null : item[key]}
                      </div>
                    </td>
                  </>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    href={`${element}/edit/${item.id}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Ver pedido
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  } else {
    return <h3>No hay resultados </h3>;
  }
};

export default Table;
