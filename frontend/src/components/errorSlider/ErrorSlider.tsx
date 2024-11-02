import React, { useCallback, useState } from 'react';
import { ErrorSliderProps } from '../../models/types';
import { Form, Row, Col } from 'react-bootstrap';
import styles from '../../styles/Tooltip.module.css';

const ErrorSlider: React.FC<ErrorSliderProps> = ({ value, onChange }) => {
  const [error, setError] = useState<string | null>(null);

  const handleSliderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setError(null);
      onChange(parseFloat(e.target.value));
    },
    [onChange]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (/^\d*\.?\d*$/.test(newValue) && parseFloat(newValue) <= 1000) {
        setError(null);
        onChange(parseFloat(newValue));
      } else {
        setError('Please enter a valid number for errors (0 to 1000).');
      }
    },
    [onChange]
  );

  return (
    <Form.Group as={Row} className="position-relative text-center">
      <Form.Label column sm={12} htmlFor="error-slider" className={styles.label}>
        Errors per record:
      </Form.Label>
      <Col sm={8}>
        <Form.Range
          id="error-slider"
          min="0"
          max="10"
          step="0.25"
          value={value}
          onChange={handleSliderChange}
          className={styles.slider}
        />
      </Col>
      <Col sm={4}>
        <Form.Control
          type="number"
          min="0"
          max="1000"
          step="0.25"
          value={value}
          onChange={handleInputChange}
          placeholder="0-1000"
          className={styles.numberInput}
        />
      </Col>
      {error && (
        <div className={`${styles.tooltip} ${styles.errorTooltip}`} role="alert">
          {error}
        </div>
      )}
    </Form.Group>
  );
};

export default ErrorSlider;
