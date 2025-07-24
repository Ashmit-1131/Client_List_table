import React from 'react';
import { ArrowUpDown } from 'lucide-react';

export default function SortIconButton({ onClick, badgeCount }) {
  return (
    <button onClick={onClick} className="relative p-2 hover:bg-gray-100 rounded">
      <ArrowUpDown size={18} />
      {badgeCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {badgeCount}
        </span>
      )}
    </button>
  );
}
