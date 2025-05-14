import { Supplier} from '../../Restock/asset-and-resource-management/model/supplier.entity';

export const SUPPLIER_LIST: Supplier[] = [
  {
    id: 1,
    name: 'Proveedora Lima SAC',
    ruc: '20123456789',
    category: 'Abarrotes',
    status: true,
    registrationDate: '2023-05-01',
    lastUpdate: '2025-05-10',
    email: 'contacto@proveedoralima.com',
    phone: '+51 912 345 678',
    address: 'Av. Arequipa 1234, Lima',
    contactPerson: 'Lucía Gómez',
    position: 'Ejecutiva de cuentas'
  },
  {
    id: 2,
    name: 'Frescos del Sur EIRL',
    ruc: '20678901234',
    category: 'Vegetales',
    status: true,
    registrationDate: '2024-02-10',
    lastUpdate: '2025-05-10',
    email: 'ventas@frescosdelsur.com',
    phone: '+51 987 654 321',
    address: 'Jr. Los Mangos 567, Arequipa',
    contactPerson: 'Carlos Linares',
    position: 'Encargado Comercial'
  },
  {
    id: 3,
    name: 'Lácteos Andinos SAC',
    ruc: '20456789012',
    category: 'Lácteos',
    status: true,
    registrationDate: '2023-09-15',
    lastUpdate: '2025-05-10',
    email: 'info@lacteosandinos.pe',
    phone: '+51 901 234 567',
    address: 'Calle La Mar 456, Cusco',
    contactPerson: 'María Huamán',
    position: 'Supervisora de ventas'
  }
];
