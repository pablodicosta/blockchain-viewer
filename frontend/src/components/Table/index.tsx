import { useEffect, useMemo, useRef, useState } from 'react';
import Paginator from './Paginator';
import TableRow from './table-row';

type TableProps = {
  columnHeaders: string[]
  rows: any[][];
  rowsPerPage: number;
  onRowClick?: Function;
}

const Table = ({ columnHeaders, rows, rowsPerPage, onRowClick }: TableProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const allowBlink = useRef(false);
  const pageRows = useMemo(
    () => rows.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage),
    [currentPage, rowsPerPage, rows]
  );

  useEffect(() => {
    allowBlink.current = true;
  }, [pageRows]);

  const handleRowClick = (row: any) => {
    if (onRowClick) {
      onRowClick(row);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    allowBlink.current = false;
  }

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-200">
                <tr>
                  {columnHeaders.map(header =>
                    <th key={header}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pageRows.map((row, i) =>
                  <TableRow
                    cells={row}
                    onClick={handleRowClick}
                    blink={allowBlink.current && i === 0 && currentPage === 0}
                    key={i}
                  />
                )}
              </tbody>
              <tfoot className="contents">
                <tr>
                  <td colSpan={3}>
                    <Paginator
                      {...{ rowsPerPage }}
                      totalRows={rows.length}
                      onPageChange={handlePageChange}
                    />
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;