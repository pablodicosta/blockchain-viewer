import { useEffect, useState } from 'react';

type TableRowProps = {
  cells: any[];
  blink?: boolean;
  onClick?: Function;
}

const TableRow = ({ cells, onClick, blink = false }: TableRowProps) => {
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    if (blink) {
      setHighlight(true);
      const timeout = setTimeout(() => setHighlight(false), 500);
      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cells])

  const handleClick = ((cells: any) => {
    if (onClick) {
      onClick(cells);
    }
  });

  return (
    <tr
      onClick={() => handleClick(cells)}
      className={`${highlight && 'bg-green-600'} hover:bg-gray-100 cursor-pointer transition-color duration-300`}
    >
      {cells.map((cell, i) =>
        <td key={i} className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900 select-none">
            {cell}
          </div>
        </td>
      )}
    </tr>
  )
};

export default TableRow;