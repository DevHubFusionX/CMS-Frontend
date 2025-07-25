import React, { useState } from 'react';
import { format } from 'date-fns';

/**
 * ContentScheduler component for scheduling post publishing
 */
const ContentScheduler = ({ onSchedule, initialDate = null }) => {
  const [isScheduled, setIsScheduled] = useState(!!initialDate);
  const [scheduledDate, setScheduledDate] = useState(
    initialDate ? format(new Date(initialDate), "yyyy-MM-dd'T'HH:mm") : ''
  );
  const [scheduleError, setScheduleError] = useState('');

  // Get minimum date (current time + 5 minutes)
  const getMinDate = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 5);
    return format(now, "yyyy-MM-dd'T'HH:mm");
  };

  // Handle scheduling toggle
  const handleScheduleToggle = () => {
    if (!isScheduled) {
      // Default to 1 hour from now when enabling scheduling
      const defaultDate = new Date();
      defaultDate.setHours(defaultDate.getHours() + 1);
      setScheduledDate(format(defaultDate, "yyyy-MM-dd'T'HH:mm"));
    }
    setIsScheduled(!isScheduled);
    
    // If turning off scheduling, notify parent
    if (isScheduled && onSchedule) {
      onSchedule(null);
    }
  };

  // Handle date change
  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setScheduledDate(newDate);
    setScheduleError('');
    
    // Validate date is in the future
    const selectedDate = new Date(newDate);
    const now = new Date();
    
    if (selectedDate <= now) {
      setScheduleError('Scheduled date must be in the future');
    } else if (onSchedule) {
      onSchedule(selectedDate);
    }
  };

  return (
    <div className="content-scheduler bg-gray-800 text-white p-4 rounded-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Schedule Publication</h3>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isScheduled}
            onChange={handleScheduleToggle}
          />
          <div className="relative w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium">
            {isScheduled ? 'Scheduled' : 'Publish immediately'}
          </span>
        </label>
      </div>
      
      {isScheduled && (
        <div className="schedule-controls">
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">Publication Date and Time</label>
            <input
              type="datetime-local"
              className="bg-gray-700 text-white rounded px-3 py-2 w-full"
              value={scheduledDate}
              min={getMinDate()}
              onChange={handleDateChange}
            />
            {scheduleError && (
              <p className="text-red-400 text-xs mt-1">{scheduleError}</p>
            )}
          </div>
          
          {scheduledDate && !scheduleError && (
            <div className="text-sm text-gray-400">
              Your content will be published on {format(new Date(scheduledDate), 'MMMM d, yyyy')} at {format(new Date(scheduledDate), 'h:mm a')}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContentScheduler;