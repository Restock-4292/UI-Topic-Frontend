export class Profile {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  description: string;
  companyName: string;
  companyAddress: string;
  companyCategories: string[];
  image: string;

  constructor() {
    this.name = 'Elon';
    this.lastName = 'Musk';
    this.email = 'elon@gmail.com';
    this.phone = '+51 940 163 699';
    this.address = 'Av. Paseo de la República cuadra 2 ';
    this.country = 'Peru';
    this.description = 'I am a restaurant manager passionate about delivering exceptional culinary experiences.';
    this.companyName = 'Alimentos S.A.';
    this.companyAddress = 'Av. Paseo de la República cuadra 3';
    this.companyCategories = ['Fast Food', 'Beverages', 'Desserts', 'Grill', 'Pizzeria', 'Buffet'];
    this.image = 'assets/admin-avatar.png';
  }
}

export const subscriber: Profile = {
  name: 'Elon Musk',
  lastName: 'Musk',
  email: 'elon@gmail.com',
  phone: '+51 940 163 699',
  address: 'Av. Paseo de la Republica cuadra 2 ',
  country: 'Peru',
  description: 'I am a restaurant manager passionate about delivering exceptional culinary experiences.',
  companyName: "Alimentos S.A.",
  companyAddress: "Av. Paseo de la Republica cuadra 3",
  companyCategories: [ 'Fast Food', 'Beverages', 'Desserts', 'Grill', 'Pizzeria', 'Buffet'],
  image: 'assets/admin-avatar.png',
};

