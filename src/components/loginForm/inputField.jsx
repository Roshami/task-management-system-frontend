import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const InputField = ({
  label,
  type = 'text',
  placeholder,
  name,
  value,
  onChange,
  error,
  disabled = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full mb-4"
    >
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-700 dark:text-violet-200"
      >
        {label}
      </label>
      <motion.input
        whileFocus={{ scale: 1.01 }}
        whileHover={{ scale: 1.005 }}
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full p-3 text-sm rounded-lg border 
          ${error ? 'border-red-500' : 'border-gray-300 dark:border-1D1B1B'} 
          bg-gray-50 dark:bg-1D1B1B 
          text-gray-900 dark:text-gray-100
          focus:ring-2 focus:ring-violet-500 focus:border-transparent
          transition-all duration-200
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        required
      />
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-1 text-xs text-red-500"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.bool,
};

export default InputField;
