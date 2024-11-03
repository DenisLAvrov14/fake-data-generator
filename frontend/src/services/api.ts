import axios from 'axios';

// Базовый URL для запросов к бэкенду
const API_URL = 'https://api-fz4h3ihjnq-uc.a.run.app';

// Функция для получения данных с сервера
export const fetchData = async (region: string, errors: number, seed: string, page: number = 1) => {
  const timestamp = new Date().getTime(); 
  const response = await axios.get(`${API_URL}/api/data`, {
    params: {
      region,
      errors,
      seed,
      page,
      timestamp, 
    },
  });
  return response.data;
};

// Функция для экспорта данных в CSV
export const exportDataToCSV = async (data: any) => {
  const response = await axios.get(`${API_URL}/api/export`, {
    params: {
      data: JSON.stringify(data),
    },
    responseType: 'blob', 
  });

  // Создаем ссылку для загрузки файла
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'data.csv');
  document.body.appendChild(link);
  link.click();
};
