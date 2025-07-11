import PropTypes from "prop-types";

const TaskCard = ({
  title,
  description,
  status,
  createdAt,
  startDate,
  endDate,
  priority,
}) => {
  // Color mappings
  const statusColors = {
    Completed: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      dot: 'bg-green-500',
    },
    'In Progress': {
      bg: 'bg-amber-100',
      text: 'text-amber-800',
      dot: 'bg-amber-500',
    },
    'Not Started': {
      bg: 'bg-gray-100',
      text: 'text-gray-800',
      dot: 'bg-gray-500',
    },
    'On Hold': { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500' },
  };

  const priorityColors = {
    High: { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500' },
    Medium: { bg: 'bg-amber-100', text: 'text-amber-800', dot: 'bg-amber-500' },
    Low: { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' },
  };

  // Format dates
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Calculate days remaining (optional)
  const daysRemaining = () => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Due today';
    return `${diffDays} days left`;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 w-full group hover:border-violet-200">
      {/* Header section */}
      <div className="flex flex-row justify-between mb-4 gap-3">
        <div className="flex-1 min-w-0">
          <h1 className="font-bold text-xl md:text-2xl text-gray-900 truncate group-hover:text-violet-700 transition-colors">
            {title}
          </h1>
          <p className="text-xs flex flex-col sm:flex-row gap-0 sm:gap-2 text-gray-500 mt-1">
            <span>Created: </span><span>{formatDate(createdAt)}</span>
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div
            className={`flex items-center gap-2 px-2 py-1 rounded-md ${
              statusColors[status]?.bg || 'bg-gray-100'
            } ${statusColors[status]?.text || 'text-gray-800'}`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                statusColors[status]?.dot || 'bg-gray-500'
              }`}
            ></div>
            <span className="text-xs font-medium capitalize">
              {status.toLowerCase()}
            </span>
          </div>
          <div
            className={`flex items-center gap-2 px-2 py-1 rounded-md ${
              priorityColors[priority]?.bg || 'bg-gray-100'
            } ${priorityColors[priority]?.text || 'text-gray-800'}`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                priorityColors[priority]?.dot || 'bg-gray-500'
              }`}
            ></div>
            <span className="text-xs font-medium capitalize">
              {priority.toLowerCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Description section */}
      <p className="text-gray-700 mb-4 line-clamp-3 text-sm leading-relaxed">
        {description}
      </p>

      {/* Date section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1 text-gray-600 bg-gray-50 px-2 py-1 rounded-md">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-xs font-medium">Dates</span>
          </div>
          <div className="text-xs text-gray-500 font-medium hidden sm:block">
            {daysRemaining()}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-sm w-full sm:w-auto">
          <div className="flex items-center justify-between sm:justify-start gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-1 text-gray-700 text-xs">
              <span className="text-gray-500">Start:</span>
              <span className="font-medium">{formatDate(startDate)}</span>
            </div>
            <div className="sm:hidden text-xs text-gray-500 font-medium">
              {daysRemaining()}
            </div>
          </div>
          <div className="flex items-center gap-1 text-gray-700 text-xs mt-1 sm:mt-0">
            <span className="text-gray-500">End:</span>
            <span className="font-medium">{formatDate(endDate)}</span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-center gap-1 sm:justify-end sm:gap-2 mt-4">
        <button className="px-3 py-1.5 text-xs rounded-lg text-violet-600 hover:text-violet-800 hover:bg-violet-50 transition-colors font-medium flex items-center gap-1">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Edit
        </button>
        <button className="px-3 py-1.5 text-xs rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors font-medium flex items-center gap-1">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          View
        </button>
        <button className="px-3 py-1.5 text-xs rounded-lg text-red-600 hover:text-red-800 hover:bg-red-50 transition-colors font-medium flex items-center gap-1">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
};

TaskCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default TaskCard;
