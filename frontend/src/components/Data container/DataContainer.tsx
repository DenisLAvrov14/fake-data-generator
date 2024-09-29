import React, { useState, useCallback, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { RecordData } from '../../models/types';
import { fetchData, exportDataToCSV } from '../../services/api';
import RegionSelector from '../region selector/RegionSelector';
import ErrorSlider from '../error slider/ErrorSlider';
import SeedInput from '../seed input/SeedInput';
import DataTable from '../data table/DataTable';

const DataContainer: React.FC = () => {
  const [region, setRegion] = useState<string>('US');
  const [errors, setErrors] = useState<number>(0);
  const [seed, setSeed] = useState<string>('0');
  const [data, setData] = useState<RecordData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false); // Для контроля загрузки данных
  const [hasMore, setHasMore] = useState<boolean>(true); // Контроль, есть ли еще данные для подгрузки

  // Функция для получения данных с сервера
  const fetchDataCallback = useCallback(() => {
    setLoading(true);  // Начинаем загрузку
    fetchData(region, errors, seed, page)
      .then((fetchedData: RecordData[]) => {
        console.log('Fetched data:', fetchedData);
        if (fetchedData.length === 0) {
          setHasMore(false); // Если данных больше нет
        }
        if (page === 1) {
          setData(fetchedData); // Обновляем данные, если это первая страница
        } else {
          setData((prevData) => [...prevData, ...fetchedData]); // Добавляем данные для скроллинга
        }
      })
      .catch((error) => console.error('Error fetching data:', error))
      .finally(() => setLoading(false)); // Завершаем загрузку
  }, [region, errors, seed, page]);

  // Обновляем данные при изменении region, errors, seed или page
  useEffect(() => {
    fetchDataCallback();
  }, [fetchDataCallback]);

  // Обработчик прокрутки для загрузки новых данных
  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 && !loading && hasMore) {
      setPage((prevPage) => prevPage + 1); // Увеличиваем номер страницы
    }
  }, [loading, hasMore]);

  // Подписка на событие скроллинга
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // Функция для изменения региона
  const handleRegionChange = useCallback((newRegion: string) => {
    setRegion(newRegion);
    setPage(1); // Сбрасываем страницу при изменении региона
    setHasMore(true); // Сбрасываем состояние наличия данных
  }, []);

  // Функция для изменения количества ошибок
  const handleErrorChange = useCallback((newErrors: number) => {
    setErrors(newErrors);
    setPage(1); // Сбрасываем страницу при изменении ошибок
    setHasMore(true); // Сбрасываем состояние наличия данных
  }, []);

  // Функция для изменения seed
  const handleSeedChange = useCallback((newSeed: string) => {
    setSeed(newSeed);
    setPage(1); // Сбрасываем страницу при изменении seed
    setHasMore(true); // Сбрасываем состояние наличия данных
  }, []);

  // Функция для генерации случайного seed
  const handleRandomSeed = useCallback(() => {
    const randomSeed = Math.floor(Math.random() * 100000).toString();
    setSeed(randomSeed);
    setPage(1); // Сбрасываем страницу при изменении seed
    setHasMore(true); // Сбрасываем состояние наличия данных
  }, []);

  const exportMutation = useMutation<void, Error, RecordData[]>({
    mutationFn: (data: RecordData[]) => exportDataToCSV(data),
    onSuccess: () => {
      alert('Data exported successfully!');
    },
    onError: (error: Error) => {
      console.error('Error exporting data:', error);
    },
  });

  const handleExport = useCallback(() => {
    if (data.length > 0) {
      exportMutation.mutate(data);
    }
  }, [data, exportMutation]);

  return (
    <div>
      <RegionSelector value={region} onChange={handleRegionChange} />
      <ErrorSlider value={errors} onChange={handleErrorChange} />
      <SeedInput value={seed} onChange={handleSeedChange} onRandom={handleRandomSeed} />
      <DataTable data={data} />
      {loading && <div>Loading...</div>} {/* Показываем индикатор загрузки */}
      <button onClick={handleExport} disabled={exportMutation.status === 'pending'}>
        {exportMutation.status === 'pending' ? 'Exporting...' : 'Export to CSV'}
       </button>
    </div>
  );
};

export default DataContainer;
