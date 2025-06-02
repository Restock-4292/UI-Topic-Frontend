import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnInit,
  AfterViewInit, SimpleChanges, OnChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Supply } from '../../model/supply.entity';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {FormsModule} from '@angular/forms';
import {MatCard} from '@angular/material/card';
import {Batch} from '../../model/batch.entity';

@Component({
  selector: 'app-inventory-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    FormsModule,
    MatCard
  ],
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.css']
})
export class InventoryTableComponent implements OnInit, OnChanges {
  @Input() batches: Batch[] = [];

  @Output() edit = new EventEmitter<Batch>();
  @Output() delete = new EventEmitter<Batch>();
  @Output() create = new EventEmitter<void>();
  @Output() add = new EventEmitter<void>();

  dataSource = new MatTableDataSource<Batch>();
  displayedColumns = ['description', 'category', 'unit', 'expiration_date', 'stock', 'perishable', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['batches']) {
      this.dataSource.data = this.batches;
    }
  }

  onAddSupply() {
    this.add.emit();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isExpired(date?: string): boolean {
    if (!date) return false;
    return new Date(date) < new Date();
  }

}
