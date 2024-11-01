import React, { useCallback } from 'react';
import { ErrorSliderProps } from '../../models/types';
import { Form, Row, Col } from 'react-bootstrap';

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
    <Form.Group as={Row} className="text-center">
      <Form.Label 
        column 
        sm={12} 
        htmlFor="error-slider" 
        className="mb-2" 
        style={{ padding: '0', marginTop: '-15px' }}  
      >
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
          style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '10px'  }}
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
          style={{ width: '75px', marginLeft: 'auto', marginRight: 'auto', marginTop: '1px' }}
        />
      </Col>
    </Form.Group>
  );
};

export default ErrorSlider;
