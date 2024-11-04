const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { Parser } = require('json2csv');
const functions = require('firebase-functions');

const app = express();

// Добавление CORS с указанием домена вашего фронтенда
app.use(cors({ origin: 'https://fake-data-generator-b9b7b.web.app' }));

const DATA_PATH = path.join(__dirname, 'local');

// Загрузка данных из файлов регионов
function loadRegionData(region) {
  const filePath = path.join(DATA_PATH, `${region.toLowerCase()}.json`);
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return data;
  } catch (error) {
    console.error(`Error loading data for region ${region}:`, error);
    return null;
  }
}

// Генерация данных
app.get('/api/data', (req, res) => {
  const { region, errors, seed, page } = req.query;
  console.log('Получен запрос для /api/data с параметрами:', req.query);

  try {
    const parsedErrors = parseFloat(errors.replace(',', '.'));
    const parsedSeed = parseInt(seed, 10);
    const parsedPage = parseInt(page, 10);

    if (isNaN(parsedErrors) || isNaN(parsedSeed) || isNaN(parsedPage)) {
      throw new Error('Invalid parameters');
    }

    const regionData = loadRegionData(region);
    if (!regionData) {
      return res.status(500).json({ error: 'Region data not found' });
    }

    const data = generateFakeData(regionData, parsedErrors, 20);
    res.json(data);
  } catch (error) {
    console.error('Error generating data:', error.message);
    res.status(500).json({ error: 'Error generating data' });
  }
});

// Функция генерации данных с учетом ошибок
function generateFakeData(regionData, errors, count) {
  const { names = [], cities = [], streets = [], phone_formats = [], language } = regionData;
  const data = [];

  for (let i = 0; i < count; i++) {
    let record = {
      id: generateUUID(),
      name: getRandomElement(names),
      address: `${getRandomElement(streets)}, ${getRandomElement(cities)}`,
      phone: formatPhoneNumber(getRandomElement(phone_formats))
    };

    record = applyErrors(record, errors, language);
    data.push(record);
  }

  return data;
}

// Генерация UUID для ID
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Получение случайного элемента из массива
function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Форматирование номера телефона
function formatPhoneNumber(format) {
  return format.replace(/#/g, () => Math.floor(Math.random() * 10));
}

// Применение ошибок к данным
function applyErrors(record, errors, language) {
  const fields = ['name', 'address', 'id'];

  for (let i = 0; i < Math.floor(errors); i++) {
    const field = fields[Math.floor(Math.random() * fields.length)];
    record[field] = distortString(record[field], language);
  }

  if (errors > Math.floor(errors) && Math.random() < errors - Math.floor(errors)) {
    record.phone = distortPhoneNumber(record.phone);
  }

  return record;
}

// Искажение строки в зависимости от алфавита
function distortString(str, language) {
  if (!str || str.length === 0) return str;

  const index = Math.floor(Math.random() * str.length);
  const randomChar = getRandomCharForLanguage(language);

  return str.substring(0, index) + randomChar + str.substring(index + 1);
}

// Получение случайного символа для искажения в зависимости от языка
function getRandomCharForLanguage(language) {
  let charset;

  switch (language) {
    case 'PL':
      charset = 'AĄBCĆDEĘFGHIJKLŁMNŃOÓPRSŚTUVWYZŹŻaąbcćdeęfghijklłmnńoóprsśtuwyzźż';
      break;
    case 'JP':
      charset = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん';
      break;
    default:
      charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      break;
  }

  return charset.charAt(Math.floor(Math.random() * charset.length));
}

// Искажение номера телефона
function distortPhoneNumber(phone) {
  if (!phone || phone.length === 0) return phone;

  const index = Math.floor(Math.random() * phone.length);
  const randomDigit = Math.floor(Math.random() * 10);

  return phone.substring(0, index) + randomDigit + phone.substring(index + 1);
}

// Endpoint для экспорта в CSV
app.post('/api/export', (req, res) => {
  console.log("Data for export:", req.body); // Лог для проверки данных
  const parser = new Parser();
  try {
    const csv = parser.parse(req.body.data);
    res.attachment('data.csv');
    res.send(csv);
  } catch (error) {
    console.error("CSV Export Error:", error);
    res.status(500).json({ error: 'Error generating CSV' });
  }
});


// Экспортируем приложение как функцию Firebase
exports.api = functions.https.onRequest(app);
