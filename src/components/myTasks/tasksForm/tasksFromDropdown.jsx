import PropTypes from 'prop-types';

const TaskFormDropdown = ({
  label,
  id,
  name,
  value,
  onChange,
  options,
  disabled,
}) => {
  return (
    <div className="mb-1">
      <label
        htmlFor={id}
        className="block mb-2 font-semibold text-lg text-gray-900 "
      >
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required
        disabled={disabled}
        className="w-full p-2 bg-gray-50/50 border border-gray-300 rounded-md"
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

TaskFormDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
};

export default TaskFormDropdown;
