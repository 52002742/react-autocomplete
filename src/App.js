import useDataFetch from "reactjs-search-autocomplete/useDatafetch";
import NotFound from "./card/Notfound";

function App() {
  const {
    results,
    isLoading,
    searchText,
    setSearchText,
    isSelected,
    setIsSelected,
    handleSearch,
    setResults,
  } = useDataFetch("https://freetestapi.com/api/v1/countries?", "get", 500);
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              value={searchText}
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
              placeholder="Search"
              aria-label="Search"
            />
            <div className="list-group">
              {isLoading && (
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
                    results &&
                    results?.map((result, index) => (
                      // eslint-disable-next-line jsx-a11y/anchor-is-valid
                      <a
                        key={index}
                        // eslint-disable-next-line no-script-url
                        href="javascript:void(0)"
                        onClick={() => {
                          setSearchText(result?.name);
                          setIsSelected(false);
                          setResults("");
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

