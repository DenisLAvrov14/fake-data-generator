import React, { useCallback } from 'react';
import { SeedInputProps } from '../../models/types';

const SeedInput: React.FC<SeedInputProps> = ({ value, onChange, onRandom }) => {
  const handleSeedChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <div>
      <label htmlFor="seed">Seed:</label>
      <input
        id="seed"
        type="text"
        value={value}
        onChange={handleSeedChange}
      />
      <button onClick={onRandom}>Random</button>
    </div>
  );
};

export default SeedInput;
