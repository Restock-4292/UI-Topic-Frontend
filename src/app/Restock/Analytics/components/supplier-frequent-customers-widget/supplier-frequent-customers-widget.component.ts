import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-supplier-frequent-customers-widget',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './supplier-frequent-customers-widget.component.html',
  styleUrl: './supplier-frequent-customers-widget.component.css'
})
export class SupplierFrequentCustomersWidgetComponent {
customers = [{
  name: 'Restaurante El Sabor Criollo',
  category: 'Comida peruana tradicional',
  description: 'Realiza compras semanales de ajíes, papas nativas y carnes al proveedor, priorizando insumos locales.'
},
{
  name: 'La Mesa Verde',
    category: 'Cocina saludable y orgánica',
  description: 'Compra gran volumen de verduras orgánicas, quinua y legumbres cada 3 días para mantener su menú fresco.'
},
{
  name: 'Don Carboncito',
    category: 'Parrillas y carnes premium',
  description: 'Adquiere cortes de carne de alta calidad y carbón vegetal cada semana, siendo uno de los mayores compradores en volumen.'
},
{
  name: 'Mar y Tierra Bistro',
    category: 'Fusión marina y gourmet',
  description: 'Solicita mariscos frescos, especias importadas y vinos artesanales, con entregas programadas tres veces por semana.'
}];
}
