/* eslint-disable jsx-a11y/anchor-is-valid */
import NotFound from "../src/card/Notfound";
import useDataFetch from "./useDatafetch";
/**
 *
 * @returns  how to use this hook in react ap
 */
function ReactJsSearchAutoComplete() {
  const {
    results,
    isLoading,
    error,
    searchTxt,
    setSearchText,
    isSelected,
    setIsSelected,
    handleSearch,
  } = useDataFetch("https://freetestapi.com/api/v1/countries?", "get", 500);
  return (
    <form className="form-inline my-2 my-lg-0">
      <input
        className="form-control mr-sm-2"
        type="search"
        value={searchTxt}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        placeholder="Search"
        aria-label="Search"
      />
      <div className="list-group">
        {isLoading && (
          <div className="text-center">
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        )}

        {error && results?.length === 0 ? (
          <NotFound message="No record found !" />
        ) : (
          <>
            {isSelected &&
              results?.map((result, index) => (
                <a
                  key={index}
                  // eslint-disable-next-line no-script-url
                  href="javascript:void(0)"
                  onClick={() => {
                    setSearchText(result?.name);
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
  );
}

export default ReactJsSearchAutoComplete;
