
import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableFieldRow from './SortableFieldRow';

const ALL_FIELDS = [
  { field: 'name',      label: 'Client Name', type: 'string' },
  { field: 'createdAt', label: 'Created At',  type: 'date'   },
  { field: 'updatedAt', label: 'Updated At',  type: 'date'   },
  { field: 'clientId',  label: 'Client ID',   type: 'string' },
];

export default function SortModal({ initialSortItems, onApply, onClose }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
  
    const activeFields = initialSortItems.map((s) => {
      const def = ALL_FIELDS.find((f) => f.field === s.field);
      return { ...def, direction: s.direction };
    });


    const inactiveFields = ALL_FIELDS.filter(
      (f) => !initialSortItems.find((s) => s.field === f.field)
    ).map((f) => ({ ...f, direction: null }));

    setItems([...activeFields, ...inactiveFields]);
  }, [initialSortItems]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = ({ active, over }) => {
    if (over && active.id !== over.id) {
      setItems((curr) => {
        const oldIdx = curr.findIndex((i) => i.field === active.id);
        const newIdx = curr.findIndex((i) => i.field === over.id);
        return arrayMove(curr, oldIdx, newIdx);
      });
    }
  };

  const setDirection = (idx, dir) => {
    setItems((curr) => {
      const copy = [...curr];
      copy[idx].direction = dir;
      return copy;
    });
  };

  const clearField = (idx) => {
    setItems((curr) => {
      const copy = [...curr];
      copy[idx].direction = null;
      return copy;
    });
  };

  const clearAll = () => {
    setItems((curr) => curr.map((i) => ({ ...i, direction: null })));
  };

  const applySort = () => {
    const sorted = items
      .filter((i) => i.direction)
      .map((i) => ({ field: i.field, direction: i.direction }));
    onApply(sorted);
  };

  const getLabels = (type) =>
    type === 'date'
      ? { asc: 'Oldest to Newest', desc: 'Newest to Oldest' }
      : { asc: 'A‑Z', desc: 'Z‑A' };

  return (
  <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black opacity-25" onClick={onClose} />

      {/* Modal */}
      <div className="absolute top-24 right-6 w-[32rem] h-[24rem] bg-white rounded-lg shadow-xl z-10 flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Sort By</h3>
        </div>

        {/* Body */}
        <div className="px-6 py-4 flex-1 overflow-y-auto">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={items.map((i) => i.field)}
              strategy={verticalListSortingStrategy}
            >
              {items.map((item, idx) => (
                <SortableFieldRow
                  key={item.field}
                  id={item.field}
                  label={item.label}
                  type={item.type}
                  direction={item.direction}
                  setDirection={(dir) => setDirection(idx, dir)}
                  clear={() => clearField(idx)}
                  labels={getLabels(item.type)}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex justify-between items-center">
          <button onClick={clearAll} className="text-gray-500 hover:underline">
            Clear all
          </button>
          <button
            onClick={applySort}
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-900"
          >
            Apply Sort
          </button>
        </div>
      </div>
    </div>
  );
}
