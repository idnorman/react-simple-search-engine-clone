import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import { useResultContext } from "../contexts/ResultContextProvider";
import { Links } from "./Links";

export const Search = () => {
  const [text, setText] = useState("Search");
  const { setSearchTerm } = useResultContext();
  const [debouncedValue] = useDebounce(text, 300);

  useEffect(() => {
    if (debouncedValue) setSearchTerm(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className="relative sm:ml-48 md-ml-72 sm:-mt-10 mt-3">
      <input
        value={text}
        type="text"
        className="sm:w-96 w-80 h-1 dark:bg-gray-200 border rounded-full shadow-sm outline-none p-5 text-black hover:shadow-lg"
        placeholder="Just type what u want"
        onChange={(e) => setText(e.target.value)}
      />
      {text && (
        <button
          type="button"
          className="absolute top-1 text-lg right-4 text-2xl text-gray-500 mr-2"
          onClick={() => setText("")}
        >
          x
        </button>
      )}

      <Links />
    </div>
  );
};
