import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        className="p-2 border rounded-l-lg focus:outline-none focus:border-blue-500"
      />
      <button type="submit" className="p-2 bg-primary text-white rounded-r-lg">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
