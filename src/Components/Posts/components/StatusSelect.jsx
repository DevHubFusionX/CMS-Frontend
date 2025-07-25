import React from 'react';

const StatusSelect = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="status" className="block text-sm font-medium text-gray-700">
        Status
      </label>
      <select
        id="status"
        name="status"
        value={value}
        onChange={onChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>
    </div>
  );
};

export default StatusSelect;