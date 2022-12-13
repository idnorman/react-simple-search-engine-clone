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
        "X-RapidAPI-Key": "8c6308cda6msh45b6ea5378b2f0cp1f9ef0jsn1d0517279fc3",
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
