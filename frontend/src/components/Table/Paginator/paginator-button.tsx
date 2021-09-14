import { ReactNode } from 'react';

type PaginatorButtonProps = {
  leftRounded?: boolean;
  rightRounded?: boolean;
  highlighted?: boolean;
  onClick: Function;
  children: ReactNode;
}

const PaginatorButton = ({ leftRounded = false, rightRounded = false, highlighted = false, onClick, children }: PaginatorButtonProps) => {
  let className = 'relative inline-flex items-center border text-sm font-medium select-none cursor-pointer';
  className += highlighted ?
    ' z-10 bg-indigo-50 border-indigo-500 text-indigo-600' :
    ' bg-white border-gray-300 text-gray-500 hover:bg-gray-100';
  className += leftRounded ? ' rounded-l-md' : '';
  className += rightRounded ? ' rounded-r-md' : '';
  className += !leftRounded && !rightRounded ? ' px-4 py-2' : ' p-2'

  return <a {...{ className }} onClick={() => onClick()}>{children}</a>
}

export default PaginatorButton;