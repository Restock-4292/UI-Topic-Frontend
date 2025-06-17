export class Profile {
  id: number;
  name: string;
  last_name: string;
  username: string;
  avatar: string;
  phone: string;
  address: string;
  country: string;
  description: string;
  business_name: string;
  business_address: string;
  user_id: number;

  constructor() {
    this.id = 0;
    this.name = '';
    this.last_name = '';
    this.username = '';
    this.avatar = '';
    this.phone = '';
    this.address = '';
    this.country = '';
    this.description = '';
    this.business_name = '';
    this.business_address = '';
    this.user_id = 0;
  }
}

