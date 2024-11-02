import React, { useCallback, useState } from 'react';
import { SeedInputProps } from '../../models/types';
import { Form, Button, InputGroup } from 'react-bootstrap';
import styles from '../../styles/Tooltip.module.css'; // Импортируем стили для тултипов

const SeedInput: React.FC<SeedInputProps> = ({ value, onChange, onRandom }) => {
  const [error, setError] = useState<string | null>(null);

  const handleSeedChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (/^\d*$/.test(newValue)) {  // Проверка, что вводится только число
        setError(null);
        onChange(newValue);
      } else {
        setError('Please enter a valid numeric seed.');
      }
    },
    [onChange]
  );

  return (
    <Form.Group controlId="seed-input" className="mb-3 position-relative">
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
      {error && <div className={`${styles.tooltip} ${styles.errorTooltip}`}>{error}</div>}
    </Form.Group>
  );
};

export default SeedInput;
