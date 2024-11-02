import React, { useCallback } from 'react';
import { RegionSelectorProps } from '../../models/types';
import { Form } from 'react-bootstrap';
import styles from '../../styles/RegionSelector.module.css';

const RegionSelector: React.FC<RegionSelectorProps> = ({ value, onChange }) => {
  const handleRegionChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <Form.Group controlId="region-selector" className={styles.regionSelector}>
      <Form.Label>Region:</Form.Label>
      <Form.Select value={value} onChange={handleRegionChange}>
        <option value="US">USA (English)</option>
        <option value="PL">Poland (Polish)</option>
        <option value="JP">Japan (Japanese)</option>
      </Form.Select>
    </Form.Group>
  );
};

export default RegionSelector;
