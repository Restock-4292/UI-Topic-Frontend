import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnInit,
  AfterViewInit
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

@Component({
  selector: 'app-supplier-inventory-table',
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
export class InventoryTableComponent implements OnInit, AfterViewInit {
  @Input() supplies: Supply[] = [];
  @Output() edit = new EventEmitter<Supply>();
  @Output() delete = new EventEmitter<Supply>();
  @Output() create = new EventEmitter<void>();
  @Output() add = new EventEmitter<void>();

  onAddSupply() {
    this.add.emit();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<Supply>();
  displayedColumns = ['description', 'category', 'unit', 'expiration_date', 'stock', 'perishable', 'actions'];

  showHidden = false;

  ngOnInit(): void {
    this.applyHiddenFilter();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyHiddenFilter(): void {
    this.dataSource.data = this.supplies.filter(s => this.showHidden || !s.hidden);
  }

  isExpired(date?: string): boolean {
    if (!date) return false;
    return new Date(date) < new Date();
  }


}
