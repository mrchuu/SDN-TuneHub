import { FaSearch } from "react-icons/fa";

function Search() {
  return (
    <form className="flex items-center bg-opacity-80 border border-gray-300 rounded-full px-4 py-1 w-1/3">
      <input
        type="text"
        placeholder="Search"
        className="w-full outline-none bg-transparent"
      />
      <button
        type="submit"
        className="ml-2 text-dark10 rounded-full p-2"
      >
        <FaSearch />
      </button>
    </form>
  );
}

export default Search;
