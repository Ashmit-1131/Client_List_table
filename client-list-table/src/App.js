import React, { useState, useMemo } from 'react';
import FilterTabs from './components/FilterTabs';
import SearchBar from './components/SearchBar';
import ClientTable from './components/ClientTable';
import SortIconButton from './components/SortIconButton';
import SortModal from './components/Modal/SortModal';
import AddClientModal from './components/Modal/AddClientModal';
import clientsData from './data/clients';
import { multiSort } from './utils/sorting';

export default function App() {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortItems, setSortItems] = useState([]);
  const [isSortOpen, setSortOpen] = useState(false);
  const [isAddOpen, setAddOpen] = useState(false);

  // 1. filter by tab
  let visible = clientsData.filter(c =>
    filter === 'All' ? true : c.type === filter
  );
  // 2. filter by search
  visible = visible.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // 3. apply sort
  const sortedClients = useMemo(() =>
    sortItems.length ? multiSort(visible, sortItems) : visible,
    [visible, sortItems]
  );

  return (
    <div className="container mx-auto p-4">
      {/* Header row */}
      <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <h1 className="text-2xl font-bold">Clients</h1>
        <div className="flex items-center space-x-2">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <SortIconButton
            onClick={() => setSortOpen(true)}
            badgeCount={sortItems.length}
          />
          {/* Sort Modal now lives here */}
          {isSortOpen && (
            <SortModal
              initialSortItems={sortItems}
              onClose={() => setSortOpen(false)}
              onApply={(newItems) => {
                setSortItems(newItems);
                setSortOpen(false);
              }}
            />
          )}
          <button
            onClick={() => setAddOpen(true)}
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-900"
          >
            + Add Client
          </button>
        </div>
      </div>

      {/* Tabs */}
      <FilterTabs selected={filter} onChange={setFilter} />

      {/* Table */}
      <ClientTable clients={sortedClients} />

      {/* Add Client Modal */}
      {isAddOpen && (
        <AddClientModal
          onClose={() => setAddOpen(false)}
          onSave={(newClient) => {
            console.log('Save client:', newClient);
            setAddOpen(false);
          }}
        />
      )}
    </div>
  );
}
