import { p } from "framer-motion/client"
import PropTypes from "prop-types"
import { IoSearchSharp } from "react-icons/io5"

const SearchBar = ({value, onChange}) => {
    return (
        <div className="flex items-center bg-gray-200 rounded-full px-4 py-2 ">
            <input
                type="text"
                placeholder="Search your task..."
                value={value}
                onChange={onChange}
                className="bg-transparent outline-none text-[12px] sm:text-lg w-25 sm:w-50 md:w-100"
            />
            
            <IoSearchSharp className="h-4 w-4 sm:h-6 sm:w-6 text-gray-400" />
        </div>
    )
}

SearchBar.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default SearchBar