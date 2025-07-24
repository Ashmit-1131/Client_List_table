
import React, { useState } from 'react';
import FilterTabs from './components/FilterTabs';
import ClientTable from './components/ClientTable';
import SortModal from './components/Modal/SortModal';
import clientsData from './data/clients';
import { multiSort } from './utils/sorting';
import { ArrowUpDown } from 'lucide-react';

export default function App() {
  const [filter, setFilter] = useState('All');
  const [sortItems, setSortItems] = useState([]); // e.g. [{ field: 'name', direction: 'asc' }, ...]
  const [isModalOpen, setModalOpen] = useState(false);

  // Filter clients by type
  const filteredClients = clientsData.filter(client => {
    if (filter === 'All') return true;
    return client.type === filter;
  });

  // Sort the filtered clients using multiSort
  const sortedClients = sortItems.length
    ? multiSort(filteredClients, sortItems)
    : filteredClients;

  return (
    <div className="container mx-auto p-4">
      {/* Filter tabs */}
      <FilterTabs selected={filter} onChange={setFilter} />

      {/* Header with Sort button */}
      <div className="flex items-center justify-between mt-4 mb-2">
        <h1 className="text-2xl font-bold">Client List</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <ArrowUpDown className="mr-1" size={18} />
          Sort
        </button>
      </div>

      {/* Client table */}
      <ClientTable clients={sortedClients} />

      {/* Sort modal */}
      {isModalOpen && (
        <SortModal
          initialSortItems={sortItems}
          onClose={() => setModalOpen(false)}
          onApply={(newSortItems) => {
            setSortItems(newSortItems);
            setModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
