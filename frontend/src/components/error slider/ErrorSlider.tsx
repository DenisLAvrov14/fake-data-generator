import React, { useCallback } from 'react';
import { ErrorSliderProps } from '../../models/types';

const ErrorSlider: React.FC<ErrorSliderProps> = ({ value, onChange }) => {
  const handleSliderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(parseFloat(e.target.value));
    },
    [onChange]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(parseFloat(e.target.value));
    },
    [onChange]
  );

  return (
    <div>
      <label htmlFor="error-slider">Errors per record:</label>
      <input
        id="error-slider"
        type="range"
        min="0"
        max="10"
        step="0.25"
        value={value}
        onChange={handleSliderChange}
      />
      <input
        type="number"
        min="0"
        max="1000"
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default ErrorSlider;
