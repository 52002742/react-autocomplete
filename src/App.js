import axios from "axios";
import { useCallback, useState } from "react";
import _ from "lodash";
import NotFound from "./card/Notfound";

function App() {
  const [searchTxt, setSearchTxt] = useState();
  const [results, setResults] = useState();
  const [isShow, setIsShow] = useState();
  const [isSelected, setIsSelected] = useState(true);

  const filterData = (datarray, query) => {
    return datarray.filter((country) =>
      country?.name?.toLowerCase().includes(query?.toLowerCase())
    );
  };

  /**
   *
   * @param {*} srcTxt
   */
  const fetchData = async (srcTxt) => {
    const { data } = await axios.get("/country.json");

    const filterdData = filterData(data, srcTxt);

    setIsShow(false);
    setResults(filterdData);
  };

  const handler = useCallback(_.debounce(fetchData, 500), []);

  const handleSearch = async (e) => {
    setIsSelected(true);
    const textval = e.target.value;
    textval ? setIsShow(true) : setIsShow(false);
    setSearchTxt(textval);

    handler(textval);
  };

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              value={searchTxt}
              onChange={handleSearch}
              placeholder="Search"
              aria-label="Search"
            />
            <div className="list-group">
              {isShow && (
                <div className="text-center">
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status">
                    <span className="sr-only"></span>
                  </div>
                </div>
              )}

              {results && results?.length === 0 ? (
                <NotFound message="No record found !" />
              ) : (
                <>
                  {isSelected &&
                    results?.map((result, index) => (
                      <a
                        key={index}
                        href="javascript:void(0)"
                        onClick={() => {
                          setSearchTxt(result?.name);
                          setIsSelected(false);
                        }}
                        className="list-group-item list-group-item-action list-group-item-light">
                        {result?.name}
                      </a>
                    ))}
                </>
              )}
            </div>
          </form>
        </div>
      </nav>
    </div>
  );
}

export default App;

