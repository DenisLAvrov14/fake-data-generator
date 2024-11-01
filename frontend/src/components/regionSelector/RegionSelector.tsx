import React, { useCallback } from 'react';
import { RegionSelectorProps } from '../../models/types';
import { Form } from 'react-bootstrap';

const RegionSelector: React.FC<RegionSelectorProps> = ({ value, onChange }) => {
  const handleRegionChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <Form.Group controlId="region-selector" className="mb-3">
      <Form.Label>Region:</Form.Label>
      <Form.Select value={value} onChange={handleRegionChange}>
        <option value="US">USA (English)</option>
        <option value="PL">Poland (Polish)</option>
        <option value="UZ">Uzbekistan (Uzbek)</option>
      </Form.Select>
    </Form.Group>
  );
};

export default RegionSelector;
