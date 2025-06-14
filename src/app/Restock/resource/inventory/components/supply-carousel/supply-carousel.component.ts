import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Supply } from '../../model/supply.entity';
import {MatIconModule} from '@angular/material/icon';
import {Category} from '../../model/category.entity';
import {TranslatePipe} from '@ngx-translate/core';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-supply-carousel',
  standalone: true,
  imports: [CommonModule, MatIconModule, TranslatePipe, MatButtonModule],
  templateUrl: './supply-carousel.component.html',
  styleUrls: ['./supply-carousel.component.css']
})
export class SupplyCarouselComponent {
  @Input() supplies: Supply[] = [];
  @Input() categories: Category[] = [];
  @Output() edit = new EventEmitter<Supply>();

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
