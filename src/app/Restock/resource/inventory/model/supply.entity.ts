export interface Supply {
  id: number;
  name: string;
  description?: string;
  perishable: boolean;
  min_stock: number;
  max_stock: number;
  price: number;
  unit_measurement_id: number;
  category_id: number;
  user_id: number;
  hidden: boolean;
  expiration_date?: Date;
}
