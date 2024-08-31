import React, { useState } from 'react';
import './searchBar.scss';

type SearchBarProps = {
  placeholder?: string;
  onSearch?: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search..." }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // const handleSearch = () => {
  //   if (onSearch) {
  //     onSearch(query);
  //   }
  // };

  return (
    <div className="search-bar">
      <input 
        type="text" 
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;