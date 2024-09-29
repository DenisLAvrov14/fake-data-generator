import React, { useState, useCallback, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { RecordData } from '../../models/types';
import { fetchData, exportDataToCSV } from '../../services/api';  // Импортируем функции API
import RegionSelector from '../region selector/RegionSelector';
import ErrorSlider from '../error slider/ErrorSlider';
import SeedInput from '../seed input/SeedInput';
import DataTable from '../data table/DataTable';

const DataContainer: React.FC = () => {
  const [region, setRegion] = useState<string>('US');
  const [errors, setErrors] = useState<number>(0);
  const [seed, setSeed] = useState<string>('0');
  const [data, setData] = useState<RecordData[]>([]);

  // Используем useMutation для экспорта данных
  const exportMutation = useMutation<void, Error, RecordData[]>({
    mutationFn: (data: RecordData[]) => exportDataToCSV(data),
    onSuccess: () => {
      alert('Data exported successfully!');
    },
    onError: (error: Error) => {
      console.error('Error exporting data:', error);
    },
  });

  const fetchDataCallback = useCallback(() => {
    fetchData(region, errors, seed)
      .then((fetchedData: RecordData[]) => setData(fetchedData))
      .catch((error) => console.error('Error fetching data:', error));
  }, [region, errors, seed]);

  useEffect(() => {
    fetchDataCallback();
  }, [fetchDataCallback]);

  const handleRegionChange = useCallback((newRegion: string) => {
    setRegion(newRegion);
  }, []);

  const handleErrorChange = useCallback((newErrors: number) => {
    setErrors(newErrors);
  }, []);

  const handleSeedChange = useCallback((newSeed: string) => {
    setSeed(newSeed);
  }, []);

  const handleRandomSeed = useCallback(() => {
    const randomSeed = Math.floor(Math.random() * 100000).toString();
    setSeed(randomSeed);
  }, []);

  const handleExport = useCallback(() => {
    if (data.length > 0) {
      exportMutation.mutate(data);  // Запускаем мутацию для экспорта данных
    }
  }, [data, exportMutation]);

  return (
    <div>
      <RegionSelector value={region} onChange={handleRegionChange} />
      <ErrorSlider value={errors} onChange={handleErrorChange} />
      <SeedInput value={seed} onChange={handleSeedChange} onRandom={handleRandomSeed} />
      <DataTable data={data} />
      <button onClick={handleExport} disabled={exportMutation.status === 'pending'}>
      {exportMutation.status === 'pending' ? 'Exporting...' : 'Export to CSV'}
      </button>
    </div>
  );
};

export default DataContainer;
