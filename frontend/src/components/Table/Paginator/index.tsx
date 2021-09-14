import { useMemo, useState } from "react";
import PaginatorButton from "./paginator-button";

type PaginatorProps = {
  rowsPerPage: number;
  totalRows: number;
  onPageChange: Function;
};

type PageButtonsProps = {
  totalPages: number;
  currentPage: number;
  onButtonClick: Function;
}

const PageButtons = ({ totalPages, currentPage, onButtonClick }: PageButtonsProps) => {
  const pageButtons = [];
  for (let i = 0; i < totalPages; i++) {
    pageButtons.push(
      <PaginatorButton
        highlighted={i === currentPage}
        onClick={() => onButtonClick(i)}
        key={i}
      >
        {i + 1}
      </PaginatorButton>
    );
  }
  return <>{pageButtons}</>;
}

const Paginator = ({ rowsPerPage, totalRows, onPageChange }: PaginatorProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = useMemo(() => totalRows / rowsPerPage, [totalRows, rowsPerPage]);
  const startRow = useMemo(() => (currentPage * rowsPerPage) + 1, [currentPage, rowsPerPage]);
  const endRow = useMemo(() => {
    const lastRow = (currentPage + 1) * rowsPerPage;
    return lastRow < totalRows ? lastRow : totalRows;
  }, [currentPage, rowsPerPage, totalRows]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    onPageChange(pageNumber);
  }


  return (
    <div className="bg-white px-4 py-3 flex flex-grow items-center justify-between border-t-2 border-gray-200 sm:px-6">
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{startRow}</span>&nbsp;
            to <span className="font-medium">{endRow}</span> of&nbsp;
            <span className="font-medium">{totalRows}</span> results
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <PaginatorButton
              leftRounded
              onClick={() => handlePageChange(currentPage > 0 ? currentPage - 1 : currentPage)}
            >
              &lt;
            </PaginatorButton>
            <PageButtons
              {...{ totalPages, currentPage }}
              onButtonClick={(pageNumber: number) => handlePageChange(pageNumber)}
            />
            <PaginatorButton
              rightRounded
              onClick={() => handlePageChange(currentPage < totalPages - 1 ? currentPage + 1 : currentPage)}
            >
              &gt;
            </PaginatorButton>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Paginator;