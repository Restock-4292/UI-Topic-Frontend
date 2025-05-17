import { Supply } from '../../Restock/resource/inventory/model/supply.entity';

export const mockSupplies: Supply[] = [
  {
    id: 1,
    name: 'Lenteja marrón',
    description: 'Se prefiere lenteja peruana categoría A o similar.',
    perishable: false,
    min_stock: 10,
    max_stock: 60,
    price: 14.5,
    unit_measurement_id: 1, // kg
    category_id: 1, // Legumbres
    user_id: 1,
    hidden: false
  },
  {
    id: 2,
    name: 'Arroz',
    description: 'Se prefiere arroz de grano largo.',
    perishable: false,
    min_stock: 20,
    max_stock: 100,
    price: 2.5,
    unit_measurement_id: 1, // kg
    category_id: 7, // Granos
    user_id: 1,
    hidden: false
  },
  {
    id: 3,
    name: 'Leche',
    description: 'Leche entera pasteurizada.',
    perishable: true,
    min_stock: 5,
    max_stock: 30,
    price: 1.2,
    unit_measurement_id: 2, // L
    category_id: 4, // Lácteos
    user_id: 1,
    hidden: false
  },
  {
    id: 4,
    name: 'Manzanas',
    description: 'Manzanas frescas de temporada.',
    perishable: true,
    min_stock: 15,
    max_stock: 50,
    price: 3.0,
    unit_measurement_id: 1, // kg
    category_id: 5, // Frutas
    user_id: 1,
    hidden: false
  },
  {
    id: 5,
    name: 'Tomates',
    description: 'Tomates frescos y maduros.',
    perishable: true,
    min_stock: 10,
    max_stock: 50,
    price: 2.0,
    unit_measurement_id: 1, // kg
    category_id: 6, // Verduras
    user_id: 1,
    hidden: false
  },
  {
    id: 6,
    name: 'Aceite de oliva',
    description: 'Aceite de oliva extra virgen.',
    perishable: false,
    min_stock: 5,
    max_stock: 20,
    price: 10.0,
    unit_measurement_id: 2, // L
    category_id: 9, // Aceites
    user_id: 1,
    hidden: false
  },
  {
    id: 7,
    name: 'Papas',
    description: 'Papas frescas para cocinar.',
    perishable: true,
    min_stock: 20,
    max_stock: 100,
    price: 1.5,
    unit_measurement_id: 1, // kg
    category_id: 6, // Verduras
    user_id: 1,
    hidden: false
  },
  {
    id: 8,
    name: 'Queso cheddar',
    description: 'Queso cheddar madurado.',
    perishable: true,
    min_stock: 5,
    max_stock: 25,
    price: 8.0,
    unit_measurement_id: 4, // g
    category_id: 4, // Lácteos
    user_id: 1,
    hidden: false
  },
  {
    id: 9,
    name: 'Cereal integral',
    description: 'Cereal integral sin azúcar.',
    perishable: false,
    min_stock: 10,
    max_stock: 40,
    price: 4.5,
    unit_measurement_id: 4, // g
    category_id: 14, // Cereales
    user_id: 1,
    hidden: false
  },
  {
    id: 10,
    name: 'Pollo',
    description: 'Pollo fresco sin procesar.',
    perishable: true,
    min_stock: 10,
    max_stock: 30,
    price: 5.0,
    unit_measurement_id: 7, // lb
    category_id: 3, // Carnes
    user_id: 1,
    hidden: false
  },
  {
    id: 11,
    name: 'Zanahorias',
    description: 'Zanahorias frescas y crujientes.',
    perishable: true,
    min_stock: 15,
    max_stock: 60,
    price: 1.8,
    unit_measurement_id: 1, // kg
    category_id: 6, // Verduras
    user_id: 1,
    hidden: false
  },
  {
    id: 12,
    name: 'Jugo de naranja',
    description: 'Jugo de naranja natural.',
    perishable: true,
    min_stock: 10,
    max_stock: 30,
    price: 3.5,
    unit_measurement_id: 2, // L
    category_id: 2, // Bebidas
    user_id: 1,
    hidden: false
  },
  {
    id: 13,
    name: 'Pan integral',
    description: 'Pan integral fresco.',
    perishable: true,
    min_stock: 5,
    max_stock: 20,
    price: 2.5,
    unit_measurement_id: 3, // unit
    category_id: 13, // Panadería
    user_id: 1,
    hidden: false
  },
  {
    id: 14,
    name: 'Chocolate en polvo',
    description: 'Chocolate en polvo para bebidas.',
    perishable: false,
    min_stock: 5,
    max_stock: 25,
    price: 6.0,
    unit_measurement_id: 4, // g
    category_id: 11, // Snacks
    user_id: 1,
    hidden: false
  }
];
