import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Supply } from '../../model/supply.entity';
import {MatIconModule} from '@angular/material/icon';
import {Category} from '../../model/category.entity';

@Component({
  selector: 'app-supply-carousel',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './supply-carousel.component.html',
  styleUrls: ['./supply-carousel.component.css']
})
export class SupplyCarouselComponent {
  @Input() supplies: Supply[] = [];
  @Input() categories: Category[] = [];

  getCategoryName(id: number): string {
    return this.categories.find(c => c.id === id)?.name || 'Unknown';
  }


  scrollLeft(container: HTMLElement) {
    container.scrollLeft -= 300;
  }

  scrollRight(container: HTMLElement) {
    container.scrollLeft += 300;
  }
}
