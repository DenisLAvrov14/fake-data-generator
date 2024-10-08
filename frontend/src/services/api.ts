import axios from 'axios';

// Базовый URL для запросов к бэкенду
const API_URL = 'http://localhost:5000';

// Функция для получения данных с сервера
export const fetchData = async (region: string, errors: number, seed: string, page: number = 1) => {
  const response = await axios.get(`${API_URL}/api/data`, {
    params: {
      region,
      errors,
      seed,
      page,
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
