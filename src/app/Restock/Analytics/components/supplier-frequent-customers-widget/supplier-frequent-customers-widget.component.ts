import {Component} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-supplier-frequent-customers-widget',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
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
  isMobile = false;

  ngOnInit() {
    this.checkViewport();
    window.addEventListener('resize', this.checkViewport.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.checkViewport.bind(this));
  }

  checkViewport(): void {
    this.isMobile = window.innerWidth <= 800;
  }
  getPairs() {
    const pairs = [];
    for (let i = 0; i < this.customers.length; i += 2) {
      pairs.push(this.customers.slice(i, i + 2));
    }
    return pairs;
  }
}
