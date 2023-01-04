import React, { createContext, useContext, useState } from "react";

const ResultContext = createContext();

const baseUrl = "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/";

const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("javascript");

  const getResults = async (type) => {
    setLoading(true);
    const response = await fetch(`${baseUrl}${type}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
      },
    });

    const data = await response.json();
    setResults(data);
    setLoading(false);
  };
  return (
    <ResultContext.Provider
      value={{
        results,
        getResults,
        searchTerm,
        setSearchTerm,
        loading,
      }}
    >
      {children}
    </ResultContext.Provider>
  );
};

const useResultContext = () => useContext(ResultContext);

export { ResultContextProvider, useResultContext };
