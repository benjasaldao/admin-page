import React, {useState, useEffect} from "react";


const Search = ({ children, list, handleSearch }) => {
  const [filteredList, setFilteredList] = useState(list);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query != "") {
      const results = handleSearch(list, query)
      setFilteredList(results);
    } else {
      setFilteredList(list);
    }
  }, [query, list])


  return (
    <>
    <div>
      <label htmlFor="search">
        <input
          className="mr-3 mt-1 mb-3 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          type="text"
          name="search"
          placeholder="Buscar cliente"
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
    </div>
    {React.cloneElement(children, {items: filteredList} )}
    </>
  );
};

export default Search;
