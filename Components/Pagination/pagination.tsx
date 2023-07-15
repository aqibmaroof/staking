
export default function Pagination({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
  paginateFront,
  paginateBack,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="py-2">
      <div>
        <nav className="pagination" aria-label="Pagination">
          <div className="page-item">
            <button
              disabled={currentPage == 1 ? true : false}
              onClick={() => {
                paginateBack();
              }}
              className={`page-link ${currentPage == 1 ? "disable" : ""}`}
            >
              &lt;
            </button>
          </div>

          {pageNumbers.map((number) => (
            <div
              className={`page-item ${currentPage === number ? "active" : ""}`}
            >
              <a
                onClick={() => {
                  paginate(number);
                }}
                className={`page-link ${currentPage === number ? "" : ""}`}
              >
                {number}
              </a>
            </div>
          ))}

          <div className="page-item">
            <button
              disabled={currentPage == pageNumbers.length ? true : false}
              onClick={() => {
                paginateFront();
              }}
              className={`page-link ${
                currentPage == pageNumbers.length ? "disable" : ""
              }`}
            >
              &gt;
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
