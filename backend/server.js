const express = require('express');
const cors = require('cors');
const { faker } = require('@faker-js/faker');  
const { Parser } = require('json2csv');

const app = express();

// Подключаем CORS для разрешения запросов с фронтенда
app.use(cors());

// Эндпоинт для генерации данных
app.get('/api/data', (req, res) => {
  const { region, errors, seed, page } = req.query;
  
  // Устанавливаем seed для стабильно генерируемых данных
  faker.seed(Number(seed) + Number(page)); 

  // Генерация фейковых данных (обновим эту логику позже для поддержки ошибок)
  const data = generateFakeData(region, errors, 20);
  
  res.json(data);
});

// Функция для генерации данных
function generateFakeData(region, errors, count) {
  const data = [];
  
  for (let i = 0; i < count; i++) {
    data.push({
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
      address: faker.address.streetAddress(),
      phone: faker.phone.phoneNumber(),
    });
  }
  
  return data;
}

// Эндпоинт для экспорта данных в CSV
app.get('/api/export', (req, res) => {
  const { data } = req.query;
  const parser = new Parser();
  const csv = parser.parse(JSON.parse(data));  // Конвертируем JSON в CSV
  
  res.attachment('data.csv');
  res.send(csv);
});

// Запуск сервера на порту 5000
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
