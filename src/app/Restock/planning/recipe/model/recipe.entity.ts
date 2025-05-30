export class Recipe {
  id: number;
  name: string;
  total_price: number;
  image_url: string;
  user_id: number;

  constructor(data: {
    id: number;
    name: string;
    total_price: number;
    image_url: string;
    user_id: number;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.total_price = data.total_price;
    this.image_url = data.image_url;
    this.user_id = data.user_id;
  }
}
