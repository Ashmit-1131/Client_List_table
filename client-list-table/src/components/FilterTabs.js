
import React from 'react';

export default function FilterTabs({ selected, onChange }) {
  const tabs = ['All', 'Individual', 'Company'];

  return (
    <div className="flex space-x-4 border-b">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`py-2 px-4 -mb-px ${
            selected === tab
              ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
              : 'text-gray-500'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
