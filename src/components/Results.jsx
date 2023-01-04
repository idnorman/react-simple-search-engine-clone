import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useResultContext } from "../contexts/ResultContextProvider";
import { Loading } from "./Loading";

export const Results = () => {
  const { results, loading, getResults, searchTerm } = useResultContext();
  const location = useLocation();

  useEffect(() => {
    if (searchTerm) {
      if (location.pathname === "/news") {
        getResults(
          `search/NewsSearchAPI?q=${searchTerm}&pageNumber=1&pageSize=10&autoCorrect=true`
        );
      } else {
        let type = "WebSearchAPI";
        if (location.pathname === "/images") {
          type = "ImageSearchAPI";
        }
        getResults(
          `Search/${type}?q=${searchTerm}&pageNumber=1&pageSize=10&autoCorrect=true`
        );
      }
    }
  }, [searchTerm, location.pathname]);

  if (loading) return <Loading />;

  switch (location.pathname) {
    case "/search":
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
          {results?.value?.map(({ url, title }, index) => {
            return (
              <div key={index} className="md:w-2/5 w-full">
                <a href={url} target="_blank" rel="noreferrer">
                  <p className="text-sm">
                    {url.length > 30 ? url.substring(0, 30) : `${url}...`}
                  </p>
                  <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                    {title}
                  </p>
                </a>
              </div>
            );
          })}
        </div>
      );
    case "/images":
      return (
        <div className="flex flex-wrap justify-center items-center">
          {results?.value?.map(({ title, webpageUrl, thumbnail }, index) => {
            return (
              <a
                className="sm:p-3 p-5"
                href={webpageUrl}
                key={index}
                target="_blank"
                rel="norefferer"
              >
                <img src={thumbnail} alt={title} loading="lazy" />
                <p className="text-sm mt-2">
                  {title.length > 30 ? title.substring(0, 30) : `${title}...`}
                </p>
                <p className="text-sm mt-2">
                  {webpageUrl?.length > 30
                    ? webpageUrl?.substring(0, 30)
                    : `${webpageUrl}...`}
                </p>
              </a>
            );
          })}
        </div>
      );

    default:
      return "ERROR";
  }
};
