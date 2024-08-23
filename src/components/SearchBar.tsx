interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search posts..."
      className="w-full p-2 border rounded-lg"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default SearchBar;
