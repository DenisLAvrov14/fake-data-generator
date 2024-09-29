import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchData } from '../services/api';

export const useData = (region: string, errors: number, seed: string, page: number = 1) => {
  return useQuery({
    queryKey: ['data', region, errors, seed, page], // Ключ для кэширования
    queryFn: () => fetchData(region, errors, seed, page), // Функция для получения данных
    staleTime: 5000, // Время устаревания данных
    placeholderData: keepPreviousData, // Используем функцию для возврата предыдущих данных
  });
};
