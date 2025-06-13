import {
  AfterViewInit,
  Component,
  EventEmitter, OnDestroy, OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatIcon} from '@angular/material/icon';
import {Router} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {
  MatFormField,
  MatInput,
  MatPrefix
} from '@angular/material/input';
import {
  MatButton,
  MatIconButton
} from '@angular/material/button';
import {SupplierService} from '../../services/supplier.service';

@Component({
  selector: 'app-supplier-modal',
  templateUrl: './supplier-modal.component.html',
  styleUrl: './supplier-modal.component.css',
  standalone: true,
  imports: [
    MatFormField,
    MatPaginator,
    MatTable,
    MatIcon,
    MatInput,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatIconButton,
    MatHeaderRow,
    MatRow,
    MatHeaderCellDef,
    MatCellDef,
    MatRowDef,
    MatButton,
    MatHeaderRowDef,
    MatPrefix
  ]
})
export class SupplierModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() close = new EventEmitter<void>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<any>([]);
  suppliers: any[] = [];
  filteredSuppliers: any[] = [];

  displayedColumns: string[] = ['name', 'email', 'address', 'catalog'];
  mobileColumns: string[] = ['name', 'email', 'catalog'];
  isMobile = false;

  constructor(
    private router: Router,
    private supplierService: SupplierService
  ) {
  }

  ngOnInit(): void {
    this.checkViewport();
    window.addEventListener('resize', this.checkViewport.bind(this));
    this.loadSuppliers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.checkViewport.bind(this));
  }

  checkViewport(): void {
    this.isMobile = window.innerWidth <= 800;
  }

  getColumns(): string[] {
    return this.isMobile ? this.mobileColumns : this.displayedColumns;
  }

  loadSuppliers(): void {
    this.supplierService.getAllSuppliers().subscribe({
      next: (suppliers) => {
        this.suppliers = suppliers;
        this.filteredSuppliers = [...suppliers];
        this.dataSource = new MatTableDataSource(this.filteredSuppliers);
        this.dataSource.paginator = this.paginator;
      },
      error: err => console.error('Failed to load suppliers:', err)
    });
  }

  applyFilter(event: Event): void {
    const query = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredSuppliers = this.suppliers.filter(s =>
      (s.name || '').toLowerCase().includes(query)
    );
    this.dataSource.data = this.filteredSuppliers;
  }

  goToDetail(id: number): void {
    this.router.navigate(['/dashboard/restaurant/suppliers', id]);
  }

  closeModal(): void {
    this.close.emit();
  }
}
