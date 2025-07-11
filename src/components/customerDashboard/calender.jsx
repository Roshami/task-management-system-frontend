import { useState } from 'react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  
  // Updated color palette to use violet shades
  const colorPalette = [
    'bg-violet-500',
    'bg-violet-600',
    'bg-violet-400',
    'bg-violet-300',
    'bg-violet-700',
    'bg-violet-800',
    'bg-violet-200',
    'bg-violet-900',
  ];

  const [events, setEvents] = useState([
    {
      date: new Date(2025, 3, 5),
      title: 'Team Meeting',
      color: getRandomColor(colorPalette),
    },
    {
      date: new Date(2025, 3, 5),
      title: 'Lunch Break',
      color: getRandomColor(colorPalette),
    },
    {
      date: new Date(2025, 3, 12),
      title: 'Product Launch',
      color: getRandomColor(colorPalette),
    },
    {
      date: new Date(2025, 3, 18),
      title: 'Client Call',
      color: getRandomColor(colorPalette),
    },
    {
      date: new Date(2025, 3, 24),
      title: 'Vacation Day',
      color: getRandomColor(colorPalette),
    },
  ]);

  function getRandomColor(palette) {
    return palette[Math.floor(Math.random() * palette.length)];
  }

  const getMonthDays = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push({ day: null });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dayEvents = events.filter(
        (e) =>
          e.date.getFullYear() === date.getFullYear() &&
          e.date.getMonth() === date.getMonth() &&
          e.date.getDate() === date.getDate()
      );

      days.push({
        day: i,
        date: date,
        isToday: date.toDateString() === new Date().toDateString(),
        events: dayEvents,
      });
    }

    return days;
  };

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const handleDateClick = (day) => {
    if (day.day) {
      const clickedDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day.day
      );
      setSelectedDate(clickedDate);
    }
  };



  

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const calendarDays = getMonthDays(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-violet-600 to-violet-800 text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <h1 className="text-2xl font-bold text-white">Calendar</h1>
            
          </div>

          <div className="flex flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">
                {monthNames[currentDate.getMonth()]}
              </h2>
              <p className="text-lg opacity-90">{currentDate.getFullYear()}</p>
            </div>

            {/* Navigation buttons */}
            <div className="flex gap-2">
              <button
                onClick={goToPreviousMonth}
                className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                aria-label="Previous month"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-3 py-1 text-sm rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
              >
                Today
              </button>
              <button
                onClick={goToNextMonth}
                className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                aria-label="Next month"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-px p-px bg-gray-200">
          {daysOfWeek.map((day, index) => (
            <div
              key={index}
              className="text-center text-sm font-medium text-gray-700 bg-gray-100 py-2"
            >
              {day}
            </div>
          ))}

          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`min-h-[40px] sm:min-h-[50px] bg-white ${
                day.day ? 'hover:bg-gray-50 cursor-pointer' : 'bg-gray-50'
              } transition-colors relative ${
                selectedDate &&
                day.date &&
                selectedDate.toDateString() === day.date.toDateString()
                  ? 'ring-2 ring-violet-500 z-10'
                  : ''
              }`}
              onClick={() => handleDateClick(day)}
            >
              {day.day && (
                <div className="p-2 h-full flex flex-col">
                  <div
                    className={`text-right text-sm font-medium ${
                      day.isToday 
                        ? 'bg-violet-600 text-white rounded-full w-6 h-6 flex items-center justify-center ml-auto' 
                        : 'text-gray-900'
                    }`}
                  >
                    {day.day}
                  </div>

                  <div className="mt-1 flex-1 overflow-y-auto">
                    {day.events.slice(0, 2).map((event, idx) => (
                      <div
                        key={idx}
                        className={`${event.color} text-white text-xs px-1.5 py-0.5 rounded mb-1 truncate`}
                        title={event.title}
                      >
                        {event.title}
                      </div>
                    ))}
                    {day.events.length > 2 && (
                      <div className="text-xs text-gray-500">
                        +{day.events.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        
      </div>
    </div>
  );
};

export default Calendar;