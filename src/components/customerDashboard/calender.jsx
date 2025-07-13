import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { useSelector } from 'react-redux';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const tasks = useSelector((state) => state.tasks.tasks);

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

  const filteredTasks = tasks.filter((task) => task.status !== 'Completed');

  const [events, setEvents] = useState([]);

  const getRandomColor = (palette) => {
    const randomIndex = Math.floor(Math.random() * palette.length);
    return palette[randomIndex];
  };

  useEffect(() => {
    const newEvents = filteredTasks.map((task) => ({
      date: new Date(task.start_date),
      color: getRandomColor(colorPalette),
      title: task.title,
    }));
    setEvents(newEvents);
  }, [tasks]);

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

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">
                {monthNames[currentDate.getMonth()]}
              </h2>
              <p className="text-lg opacity-90">{currentDate.getFullYear()}</p>
            </div>

            {/* Navigation buttons */}
            <div className="flex gap-2">
              <button
                onClick={goToPreviousMonth}
                className="p-2 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
                aria-label="Previous month"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-3 py-1 text-sm rounded-lg bg-white/20 hover:bg-white/30 transition-colors cursor-pointer"
              >
                Today
              </button>
              <button
                onClick={goToNextMonth}
                className="p-2 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
                aria-label="Next month"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-px p-px bg-gray-200">
          {daysOfWeek.map((day, index) => (
            <div
              key={index}
              className="text-center text-[10px] sm:text-sm font-medium text-gray-700 bg-gray-100 py-2"
            >
              {day}
            </div>
          ))}

          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`min-h-[10px] sm:min-h-[50px] bg-white ${
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
                <div className="p-2 h-full flex flex-col items-center justify-center">
                  <div
                    className={`text-right text-sm font-medium ${
                      day.isToday
                        ? 'bg-violet-600 text-white rounded-full w-4 sm:w-6 h-6 flex items-center justify-center m-auto'
                        : 'text-gray-900'
                    }`}
                  >
                    {day.day}
                  </div>
                  {/* Event Dots */}
                  <div className="flex flex-wrap justify-center mt-1 gap-0.5">
                    {day.events.map((event, index) => (
                      <span
                        key={index}
                        className={`w-2 h-2 rounded-full ${event.color}`}
                        title={event.title}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Selected Date Details */}
        {selectedDate && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-900">
                {selectedDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </h3>
              <button
                onClick={() => setSelectedDate(null)}
                className="text-gray-500 hover:text-gray-700 cursor-pointer "
              >
                <IoMdClose className="w-5 h-5" />
              </button>
            </div>

            {events.filter(
              (e) => e.date.toDateString() === selectedDate.toDateString()
            ).length > 0 ? (
              <ul className="space-y-2">
                {events
                  .filter(
                    (e) => e.date.toDateString() === selectedDate.toDateString()
                  )
                  .map((event, index) => (
                    <li
                      key={index}
                      className="flex items-start p-2 bg-white rounded-lg border border-gray-200"
                    >
                      <span
                        className={`block w-3 h-3 rounded-full mt-1 mr-2 ${event.color}`}
                      />
                      <span className="text-sm text-gray-800 flex-1">
                        {event.title}
                      </span>
                    </li>
                  ))}
              </ul>
            ) : (
              <div className="text-center py-4 text-gray-500">
                No events scheduled
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
