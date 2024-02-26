import { FaSearch } from "react-icons/fa";
import HeadlessTippy from "@tippyjs/react/headless";
import { useState, useEffect } from "react";
import useDebounce from "./useDebounce.js";
import Item from "./Item.js";
import PerformRequest from "../utilities/PerformRequest";

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const { OriginalRequest } = PerformRequest();

  const debouncedValue = useDebounce(searchValue, 2000);

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResult([]);
      return;
    }
    const fetch = async () => {
      const data = await OriginalRequest(`songs/search/${debouncedValue}`, "GET");
      if (data) {
        setSearchResult(data);
      }else{
        setSearchResult([])
      }
    };
    fetch();
  }, [debouncedValue]);

  //   const handleHideResult = () => {
  //     setShowResult(false);
  // };

  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) {
      setSearchValue(searchValue);
    }
  };

  return (
    <HeadlessTippy
      interactive
      // visible={showResult}
      visible={showResult && searchResult.length > 0}
      render={(attrs) => (
        <div className="bg-white border border-gray-300 rounded-md shadow-md p-4 max-w-xs ">
          <h4>Accounts</h4>
          {searchResult.map((result) => (
            <Item key={result._id} data={result} />
          ))}
        </div>
      )}
      onClickOutside={() => setShowResult(false)}
    >
      <form className="flex items-center bg-opacity-80 border border-gray-300 rounded-full px-4 py-1 w-1/3">
        <input
          value={searchValue}
          type="text"
          placeholder="Search"
          className="w-full outline-none bg-transparent"
          onChange={handleChange}
          onFocus={() => setShowResult(true)}
        />
        <button type="submit" className="ml-2 text-dark10 rounded-full p-2">
          <FaSearch />
        </button>
      </form>
    </HeadlessTippy>
  );
}

export default Search;
