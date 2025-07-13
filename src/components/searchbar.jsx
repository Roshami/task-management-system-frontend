import PropTypes from 'prop-types';
import { IoSearchSharp } from 'react-icons/io5';
import { FiX } from 'react-icons/fi';

const SearchBar = ({ value, onChange, onClear }) => {
  return (
    <div className="flex items-center bg-gray-200 rounded-full relative w-full max-w-md">
      <div className="absolute left-3 text-gray-400">
        <IoSearchSharp className="h-5 w-5" />
      </div>

      <input
        type="text"
        placeholder="Search tasks..."
        value={value}
        onChange={onChange}
        className="w-full bg-transparent outline-none pl-10 pr-8 py-2.5 rounded-full  focus:border-violet-500 focus:ring-2 focus:ring-violet-200 text-gray-900 placeholder-gray-400 transition-all duration-200"
      />

      {value && (
        <button
          onClick={onClear}
          className="absolute right-3 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Clear search"
        >
          <FiX className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func,
};

export default SearchBar;
