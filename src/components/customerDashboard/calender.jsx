import { useState } from 'react';

const Calender = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const colorPalette = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-indigo-500',
    'bg-pink-500',
    'bg-teal-500',
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
    {
      date: new Date(2025, 3, 24),
      title: 'Evening Walk',
      color: getRandomColor(colorPalette),
    },
    {
      date: new Date(2025, 3, 24),
      title: 'Dinner Party',
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

  const addRandomEvent = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const maxDay = new Date(year, month + 1, 0).getDate();
    const randomDay = Math.floor(Math.random() * maxDay) + 1;

    const newEvent = {
      date: new Date(year, month, randomDay),
      title: `New Event ${events.length + 1}`,
      color: getRandomColor(colorPalette),
    };

    setEvents([...events, newEvent]);
  };

  const removeLastEvent = () => {
    if (events.length > 0) {
      const updatedEvents = [...events];
      updatedEvents.pop();
      setEvents(updatedEvents);
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
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 transform hover:scale-[1.01]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Calendar</h1>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">
                {monthNames[currentDate.getMonth()]}
              </h2>
              <p className="text-lg opacity-90">{currentDate.getFullYear()}</p>
            </div>

            {/* Navigation buttons */}
            <div className="flex space-x-2">
              <button
                onClick={goToPreviousMonth}
                className="p-2 rounded-full hover:bg-white/20 transition-colors"
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
                className="px-2 py-1 text-[12px] rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                Today
              </button>
              <button
                onClick={goToNextMonth}
                className="p-2 rounded-full hover:bg-white/20 transition-colors"
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
        <div className="grid grid-cols-7 gap-1 p-2 bg-gray-50">
          {daysOfWeek.map((day, index) => (
            <div
              key={index}
              className="text-center text-sm font-medium text-gray-500 py-2"
            >
              {day}
            </div>
          ))}

          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`min-h-[10px] border border-transparent rounded-lg transition-all cursor-pointer duration-200 ${
                day.day ? 'hover:border-blue-200' : ''
              } ${
                selectedDate &&
                day.date &&
                selectedDate.toDateString() === day.date.toDateString()
                  ? 'ring-2 ring-blue-400 ring-inset'
                  : ''
              }`}
              onClick={() => handleDateClick(day)}
            >
              {day.day && (
                <div
                  className={`p-2 h-full rounded-lg transition-colors ${
                    day.isToday ? 'bg-blue-100' : 'hover:bg-gray-100'
                  }`}
                >
                  <div
                    className={`text-right text-sm font-medium ${
                      day.isToday ? 'text-blue-600 font-bold' : 'text-gray-700'
                    }`}
                  >
                    {day.day}
                  </div>

                  <div className="mt-1 space-y-1">
                    {day.events.map((event, idx) => (
                      <div
                        key={idx}
                        className={`${event.color} text-white text-xs px-1.5 py-0.5 rounded truncate`}
                        title={event.title}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Selected Date Details */}
        {selectedDate && (
          <div className="p-4 border-t border-gray-200">
            <h3 className="font-medium text-gray-700 mb-2">
              Events for{' '}
              {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </h3>

            {events.filter(
              (e) =>
                e.date.getFullYear() === selectedDate.getFullYear() &&
                e.date.getMonth() === selectedDate.getMonth() &&
                e.date.getDate() === selectedDate.getDate()
            ).length > 0 ? (
              <ul className="space-y-2">
                {events
                  .filter(
                    (e) =>
                      e.date.getFullYear() === selectedDate.getFullYear() &&
                      e.date.getMonth() === selectedDate.getMonth() &&
                      e.date.getDate() === selectedDate.getDate()
                  )
                  .map((event, index) => (
                    <li key={index} className="flex items-center">
                      <span
                        className={`inline-block w-3 h-3 rounded-full mr-2 ${event.color}`}
                      ></span>
                      <span className="text-sm">{event.title}</span>
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 italic">
                No events scheduled.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Calender;
