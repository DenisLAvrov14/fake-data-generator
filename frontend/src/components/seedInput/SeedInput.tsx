import React, { useCallback } from 'react';
import { SeedInputProps } from '../../models/types';
import { Form, Button, InputGroup } from 'react-bootstrap';

const SeedInput: React.FC<SeedInputProps> = ({ value, onChange, onRandom }) => {
  const handleSeedChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <Form.Group controlId="seed-input" className="mb-3">
      <Form.Label>Seed:</Form.Label>
      <InputGroup>
        <Form.Control
          type="text"
          value={value}
          onChange={handleSeedChange}
          placeholder="Enter seed value"
        />
        <Button variant="outline-secondary" onClick={onRandom}>
          Random
        </Button>
      </InputGroup>
    </Form.Group>
  );
};

export default SeedInput;
