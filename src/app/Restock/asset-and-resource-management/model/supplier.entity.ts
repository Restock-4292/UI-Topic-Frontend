export class Supplier {
  id: number;
  name: string;
  ruc: string;
  category: string;
  status: boolean;
  registrationDate: string;
  lastUpdate: string;
  email: string;
  phone: string;
  address: string;
  contactPerson: string;
  position: string;
  added: boolean;

  constructor(supplier: {
    id?: number,
    name?: string,
    ruc?: string,
    category?: string,
    status?: boolean,
    registrationDate?: string,
    lastUpdate?: string,
    email?: string,
    phone?: string,
    address?: string,
    contactPerson?: string,
    position?: string
    added?: boolean,
  }) {
    this.id = supplier.id || 0;
    this.name = supplier.name || '';
    this.ruc = supplier.ruc || '';
    this.category = supplier.category || '';
    this.status = supplier.status ?? false;
    this.registrationDate = supplier.registrationDate || '';
    this.lastUpdate = supplier.lastUpdate || '';
    this.email = supplier.email || '';
    this.phone = supplier.phone || '';
    this.address = supplier.address || '';
    this.contactPerson = supplier.contactPerson || '';
    this.position = supplier.position || '';
    this.added = supplier.added ?? false;
  }
}
