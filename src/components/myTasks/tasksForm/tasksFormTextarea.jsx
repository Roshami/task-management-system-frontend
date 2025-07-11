import PropTypes from 'prop-types';

const TaskFormTextarea = ({
  label,
  id,
  name,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded-md"
      ></textarea>
    </div>
  );
};

TaskFormTextarea.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TaskFormTextarea;
