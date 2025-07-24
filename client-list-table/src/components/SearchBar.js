import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative text-gray-600">
      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2" size={16} />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search clients"
        className="pl-8 pr-2 py-1 border rounded focus:outline-none focus:ring"
      />
    </div>
  );
}
