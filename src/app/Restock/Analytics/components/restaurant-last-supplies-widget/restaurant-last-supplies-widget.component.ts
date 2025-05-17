import {Component} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {NgForOf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-restaurant-last-supplies-widget',
  imports: [
    MatIcon,
    MatIconButton,
    NgForOf
  ],
  templateUrl: './restaurant-last-supplies-widget.component.html',
  styleUrl: './restaurant-last-supplies-widget.component.css',
  standalone: true
})
export class RestaurantLastSuppliesWidgetComponent {
  ingredients = [
    { name: 'Pescado bonito', category: 'Fish', description: 'Se requiere producto fresco, refrigerado entre 0°C y 4°C' },
    { name: 'Ají amarillo', category: 'Vegetal', description: 'Usado para base de salsas. Preferencia fresco' },
    { name: 'Papa Huayro', category: 'Vegetal', description: 'Usada para platos criollos. Se requiere cocción rápida' },
    { name: 'Cebolla roja', category: 'Vegetal', description: 'Requiere frescura y consistencia firme' },
    { name: 'Leche evaporada', category: 'Lácteo', description: 'Marca específica solicitada, se almacena en ambiente seco' },
    { name: 'Queso fresco', category: 'Lácteo', description: 'Debe venir sellado al vacío y refrigerado' },
    { name: 'Arroz', category: 'Grano', description: 'Variedad extra grano largo' },
    { name: 'Ajo molido', category: 'Condimento', description: 'Debe venir empacado en bolsas de 1kg' },
    { name: 'Culantro fresco', category: 'Hierba', description: 'Entregar en bolsas húmedas, refrigerado' },
    { name: 'Pimiento rojo', category: 'Vegetal', description: 'Se requiere lavado y listo para picar' }
  ];

  currentIndex = 0;

  get visibleIngredients() {
    return this.ingredients.slice(this.currentIndex, this.currentIndex + 5);
  }

  prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  next(): void {
    if (this.currentIndex + 5 < this.ingredients.length) {
      this.currentIndex++;
    }
  }
  getPairs() {
    const pairs = [];
    for (let i = 0; i < this.ingredients.length; i += 2) {
      pairs.push(this.ingredients.slice(i, i + 2));
    }
    return pairs;
  }
}
