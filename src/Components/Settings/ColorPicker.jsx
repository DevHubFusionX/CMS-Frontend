import React, { useState, useRef, useEffect } from 'react';

const ColorPicker = ({ color, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState(color);
  const colorPickerRef = useRef(null);
  
  // Predefined color options
  const colorOptions = [
    '#3B82F6', // Blue
    '#10B981', // Green
    '#F59E0B', // Yellow
    '#EF4444', // Red
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#6B7280', // Gray
    '#000000', // Black
  ];
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setCurrentColor(newColor);
    onChange(newColor);
  };
  
  const handleColorOptionClick = (colorOption) => {
    setCurrentColor(colorOption);
    onChange(colorOption);
    setIsOpen(false);
  };
  
  return (
    <div className="relative" ref={colorPickerRef}>
      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          style={{ backgroundColor: currentColor }}
        >
          <span className="sr-only">Open color picker</span>
        </button>
        
        <input
          type="text"
          value={currentColor}
          onChange={handleColorChange}
          className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="#RRGGBB"
        />
        
        <input
          type="color"
          value={currentColor}
          onChange={handleColorChange}
          className="h-10 w-10 border-0 p-0 cursor-pointer"
        />
      </div>
      
      {isOpen && (
        <div className="absolute mt-2 p-2 bg-white rounded-md shadow-lg z-10 border border-gray-200">
          <div className="grid grid-cols-4 gap-2">
            {colorOptions.map((colorOption) => (
              <button
                key={colorOption}
                type="button"
                onClick={() => handleColorOptionClick(colorOption)}
                className="w-8 h-8 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
                style={{ backgroundColor: colorOption }}
              >
                <span className="sr-only">Select color {colorOption}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;