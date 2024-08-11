import axios from "axios";
import _ from "lodash";
import { useCallback, useState } from "react";

function useDataFetch(url, method, delay) {
  const [results, setResults] = useState();
  const [isloading, setIsLoading] = useState();
  const [error, setError] = useState();
  const [searchText, setSearchText] = useState("");
  const [isSelected, setIsSelected] = useState(true);

  async function fetchData(textval) {
    setIsLoading(true);
    try {
      const parans = {
        method,
        url,
        params: { search: textval },
        responseType: "json",
      };
      const { data } = await axios(parans);
      setResults(data);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }

  const handler = useCallback(_.debounce(fetchData, delay), []);
  const handleSearch = async (textval) => {
    setIsSelected(true);
    setIsLoading(true);
    textval ? setIsLoading(true) : setIsLoading(false);
    setSearchText(textval);

    handler(textval);
  };

  return {
    results,
    isloading,
    error,
    searchText,
    setSearchText,
    isSelected,
    setIsSelected,
    handleSearch,
    setResults,
  };
}

export default useDataFetch;
