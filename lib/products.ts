import productsData from '../data/products.json';

export interface Product {
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


export function getAllProductsAlphabetically(): Product[] {
  return [...productsData].sort((a, b) => a.name.localeCompare(b.name));
}


export function getAllProductsByDate(): Product[] {
  return [...productsData].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}


export function getProductsInStock(): Product[] {
  return productsData.filter(product => product.amount > 0);
}


export function getProductsOutOfStock(): Product[] {
  return productsData.filter(product => product.amount === 0);
}

// Wszystkie produkty danej kategorii
export function getProductsByCategory(type: Product['type']): Product[] {
  return productsData.filter(product => product.type === type);
}

// Wybrany produkt (po id)
export function getProductById(id: number): Product | undefined {
  return productsData.find(product => product.id === id);
}

// Zmiana ilości produktu o podanym id
export function updateProductAmount(id: number, newAmount: number): Product | null {
  const product = productsData.find(p => p.id === id);
  if (!product) {
    return null;
  }
  product.amount = newAmount;
  return product;
}

// Eksport wszystkich produktów (dla wygody)
export function getAllProducts(): Product[] {
  return productsData;
}

