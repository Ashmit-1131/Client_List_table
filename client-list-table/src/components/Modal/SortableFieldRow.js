
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Grip, X } from 'lucide-react';

export default function SortableFieldRow({
  id,
  label,
  type,
  direction,
  setDirection,
  clear,
  labels,  // { asc, desc }
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const active = direction !== null;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={style}
      className={`flex items-center px-4 py-2 mb-2 rounded ${
        active ? 'bg-gray-50' : 'bg-gray-100'
      }`}
    >
      {/* Drag handle */}
      <div className={`mr-3 ${active ? 'cursor-grab' : 'opacity-0'}`} {...listeners}>
        <Grip size={16} className="text-gray-500" />
      </div>

      {/* Label */}
      <div className={`flex-1 ${active ? 'text-gray-900' : 'text-gray-500'}`}>
        {label}
      </div>

      {/* Direction buttons */}
      <div className="flex space-x-2 mr-3">
        <button
          onClick={() => setDirection('asc')}
          className={`px-2 py-1 text-xs rounded ${
            active && direction === 'asc'
              ? 'bg-black text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          ↑ {labels.asc}
        </button>
        <button
          onClick={() => setDirection('desc')}
          className={`px-2 py-1 text-xs rounded ${
            active && direction === 'desc'
              ? 'bg-black text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          ↓ {labels.desc}
        </button>
      </div>

      {/* Clear “×” */}
      <button onClick={clear} className="text-gray-500 hover:text-red-500">
        <X size={16} />
      </button>
    </div>
  );
}
