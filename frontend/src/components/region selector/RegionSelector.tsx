import React, { useCallback } from 'react';
import { RegionSelectorProps } from '../../models/types';

const RegionSelector: React.FC<RegionSelectorProps> = ({ value, onChange }) => {
  const handleRegionChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <div>
      <label htmlFor="region">Region:</label>
      <select id="region" value={value} onChange={handleRegionChange}>
        <option value="US">USA (English)</option>
        <option value="PL">Poland (Polish)</option>
        <option value="UZ">Uzbekistan (Uzbek)</option>
      </select>
    </div>
  );
};

export default RegionSelector;
