import * as fs from 'fs';
import * as path from 'path';

interface Product {
  id: number;
  code: string;
  name: string;
  type: 'procesor' | 'karta graficzna' | 'pamięć ram' | 'dysk';
  price: number;
  amount: number;
  description: string;
  date: string;
  image: string;
}

const types: Product['type'][] = ['procesor', 'karta graficzna', 'pamięć ram', 'dysk'];

const processorNames = [
  'Intel Core i9-14900K',
  'Intel Core i7-14700K',
  'Intel Core i5-14600K',
  'AMD Ryzen 9 7950X',
  'AMD Ryzen 7 7800X3D',
  'AMD Ryzen 5 7600X',
  'Intel Core i9-13900K',
  'Intel Core i7-13700K',
  'AMD Ryzen 9 7900X',
  'AMD Ryzen 7 7700X',
];

const gpuNames = [
  'NVIDIA GeForce RTX 4090',
  'NVIDIA GeForce RTX 4080',
  'NVIDIA GeForce RTX 4070',
  'AMD Radeon RX 7900 XTX',
  'AMD Radeon RX 7900 XT',
  'NVIDIA GeForce RTX 4060 Ti',
  'NVIDIA GeForce RTX 4060',
  'AMD Radeon RX 7800 XT',
  'AMD Radeon RX 7700 XT',
  'NVIDIA GeForce RTX 3090',
];

const ramNames = [
  'Corsair Vengeance DDR5 32GB',
  'G.Skill Trident Z5 DDR5 32GB',
  'Kingston Fury Beast DDR5 16GB',
  'Corsair Dominator DDR5 64GB',
  'G.Skill Ripjaws DDR5 16GB',
  'Crucial Ballistix DDR4 32GB',
  'HyperX Fury DDR4 16GB',
  'Corsair Vengeance LPX DDR4 32GB',
  'G.Skill Aegis DDR4 16GB',
  'Patriot Viper DDR4 16GB',
];

const diskNames = [
  'Samsung 990 PRO 2TB',
  'WD Black SN850X 2TB',
  'Crucial P5 Plus 1TB',
  'Kingston NV2 1TB',
  'Seagate FireCuda 530 2TB',
  'Samsung 980 PRO 1TB',
  'WD Blue SN580 1TB',
  'Crucial MX500 1TB',
  'Seagate BarraCuda 2TB',
  'Toshiba P300 2TB',
];

function generateCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 10; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function generateDate(): string {
  const start = new Date(2023, 0, 1);
  const end = new Date();
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
}

function generateDescription(type: Product['type'], name: string): string {
  const descriptions: Record<Product['type'], string[]> = {
    'procesor': [
      'Wydajny procesor do gier i aplikacji',
      'Idealny do streamingu i renderowania',
      'Najnowsza generacja procesorów',
      'Wysoka wydajność przy niskim poborze mocy',
    ],
    'karta graficzna': [
      'Najnowsza generacja kart graficznych',
      'Idealna do gier w rozdzielczości 4K',
      'Wsparcie dla ray tracing',
      'Wysoka wydajność w grach i renderowaniu',
    ],
    'pamięć ram': [
      'Wysoka wydajność i stabilność',
      'Idealna do gier i pracy',
      'Niskie opóźnienia',
      'Wsparcie dla najnowszych platform',
    ],
    'dysk': [
      'Szybki transfer danych',
      'Idealny do systemu i gier',
      'Wysoka niezawodność',
      'Duża pojemność i wydajność',
    ],
  };
  const options = descriptions[type];
  return options[Math.floor(Math.random() * options.length)];
}

const products: Product[] = [];

// Generowanie produktów
let id = 1;

// Procesory (25)
for (let i = 0; i < 25; i++) {
  const name = processorNames[Math.floor(Math.random() * processorNames.length)];
  products.push({
    id: id++,
    code: generateCode(),
    name,
    type: 'procesor',
    price: Math.round((Math.random() * 3000 + 500) * 100) / 100,
    amount: Math.floor(Math.random() * 50),
    description: generateDescription('procesor', name),
    date: generateDate(),
    image: `/images/products/${name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
  });
}

// Karty graficzne (25)
for (let i = 0; i < 25; i++) {
  const name = gpuNames[Math.floor(Math.random() * gpuNames.length)];
  products.push({
    id: id++,
    code: generateCode(),
    name,
    type: 'karta graficzna',
    price: Math.round((Math.random() * 5000 + 1000) * 100) / 100,
    amount: Math.floor(Math.random() * 30),
    description: generateDescription('karta graficzna', name),
    date: generateDate(),
    image: `/images/products/${name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
  });
}

// Pamięć RAM (25)
for (let i = 0; i < 25; i++) {
  const name = ramNames[Math.floor(Math.random() * ramNames.length)];
  products.push({
    id: id++,
    code: generateCode(),
    name,
    type: 'pamięć ram',
    price: Math.round((Math.random() * 2000 + 200) * 100) / 100,
    amount: Math.floor(Math.random() * 100),
    description: generateDescription('pamięć ram', name),
    date: generateDate(),
    image: `/images/products/${name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
  });
}

// Dyski (25)
for (let i = 0; i < 25; i++) {
  const name = diskNames[Math.floor(Math.random() * diskNames.length)];
  products.push({
    id: id++,
    code: generateCode(),
    name,
    type: 'dysk',
    price: Math.round((Math.random() * 1500 + 200) * 100) / 100,
    amount: Math.floor(Math.random() * 80),
    description: generateDescription('dysk', name),
    date: generateDate(),
    image: `/images/products/${name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
  });
}

// Zapis do pliku JSON
const outputPath = path.join(__dirname, '../data/products.json');
fs.writeFileSync(outputPath, JSON.stringify(products, null, 2), 'utf-8');
console.log(`Wygenerowano ${products.length} produktów do pliku ${outputPath}`);

