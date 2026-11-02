const SearchBar = ({ placeholder = "Search...", value, onChange, ...rest }) => {
  return (
    <input
      className="search-bar"
      type="search"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    />
  );
};

export default SearchBar;
