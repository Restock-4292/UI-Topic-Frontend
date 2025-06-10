import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatSelect, MatSelectModule} from '@angular/material/select';
import {MatButton} from '@angular/material/button';


export interface DateRangeOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-filter-section',
  imports: [CommonModule,
    FormsModule, MatFormFieldModule, MatIcon, MatSelectModule, MatInput, MatButton],
  templateUrl: './filter-section.component.html',
  styleUrl: './filter-section.component.css'
})


export class FilterSectionComponent {
  @Input() title: string = 'Orders';
  @Input() searchQuery: string = '';
  @Input() selectedDateRange: string = '';
  @Input() searchPlaceholder: string = 'Search...';
  @Input() sortOrder: number = 1;
  @Input() sortLabel: string = 'Order Date';

  @Output() searchQueryChange = new EventEmitter<string>();
  @Output() selectedDateRangeChange = new EventEmitter<string>();
  @Output() toggleSort = new EventEmitter<void>();

  dateRangeOptions: DateRangeOption[] = [
    { label: 'Last 7 days', value: '7days' },
    { label: 'Last 30 days', value: '30days' },
    { label: 'Last 3 months', value: '3months' }
  ];

  onSearchChange(value: string): void {
    this.searchQueryChange.emit(value);
  }

  onDateRangeChange(value: string): void {
    this.selectedDateRangeChange.emit(value);
  }

  onToggleSort(): void {
    this.toggleSort.emit();
  }

  getSortIcon(): string {
    return this.sortOrder === 1 ? 'arrow_upward' : 'arrow_downward';
  }

  handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.onSearchChange(input.value);
  }
}
