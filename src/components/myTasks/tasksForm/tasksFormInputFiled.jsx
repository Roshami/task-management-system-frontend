import PropTypes from 'prop-types';

const TaskFormInputField = ({ type, label, id, name, value, onChange }) => {
  return (
    <div className="mb-1">
      <label
        htmlFor={id}
        className="block mb-2 font-semibold text-lg text-gray-900 "
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        required
        onChange={onChange}
        placeholder={label}
        className="w-full p-2 bg-gray-50/50 border border-gray-300 rounded-md"
      />
    </div>
  );
};

TaskFormInputField.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TaskFormInputField;
