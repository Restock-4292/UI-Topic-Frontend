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
import {TranslatePipe} from '@ngx-translate/core';

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
    MatCard,
    TranslatePipe
  ],
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.css']
})
/**
 * @summary
 * Component for displaying and managing inventory batches.
 */
export class InventoryTableComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() batches: Batch[] = [];

  @Output() edit = new EventEmitter<Batch>();
  @Output() delete = new EventEmitter<Batch>();
  @Output() create = new EventEmitter<void>();
  @Output() add = new EventEmitter<void>();

  /**
   * Data source for the inventory table.
   */
  dataSource = new MatTableDataSource<Batch>();
  /**
   * Columns to be displayed in the inventory table.
   */
  displayedColumns = ['description', 'category', 'unit', 'expiration_date', 'stock', 'perishable', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /**
   * Initializes the component.
   * Sets up the filter predicate for the data source
   * to filter batches based on supply description or name.
   */
  ngOnInit(): void {
    this.dataSource.filterPredicate = (data: Batch, filter: string) => {
      const search = filter.trim().toLowerCase();
      const description= data.supply?.description?.toLowerCase() || '';
      const name = (data.supply as any)?.name?.toLowerCase() || '';
      return description.includes(search) || name.includes(search);
    }
  }

  /**
   * After view initialization, sets the paginator for the data source.
   * This allows the table to paginate through the batches.
   */
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Handles changes to the input properties of the component.
   * @param changes
   */
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
