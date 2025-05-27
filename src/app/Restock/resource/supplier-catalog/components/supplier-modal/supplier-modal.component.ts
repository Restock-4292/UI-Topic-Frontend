import {
  AfterViewInit,
  Component,
  EventEmitter,
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
import {Supplier} from '../../model/supplier.entity';
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
export class SupplierModalComponent implements AfterViewInit {
  @Output() close = new EventEmitter<void>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['name', 'email', 'address', 'catalog'];
  mobileColumns: string[] = ['name', 'email', 'catalog'];
  dataSource = new MatTableDataSource<Supplier>([]);
  suppliers: Supplier[] = [];

  constructor(
    private router: Router,
    private supplierService: SupplierService
  ) {
  }

  loadSuppliers(): void {
    this.supplierService.getAllSuppliers().subscribe({
      next: (users: any[]) => {
        this.suppliers = users
          .filter(u => u.role_id?.name === 'supplier')
          .map(u => ({
            id: u.id,
            name: u.name,
            email: u.email,
            address: u.address || '-',
            ruc: '',
            category: '',
            status: true,
            registrationDate: '',
            lastUpdate: '',
            phone: '',
            contactPerson: '',
            position: '',
            added: false
          }));
        this.dataSource = new MatTableDataSource(this.suppliers);
        this.dataSource.paginator = this.paginator;
      },
      error: err => console.error('Failed to load users:', err)
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  goToDetail(id: number): void {
    this.router.navigate(['/dashboard/restaurant/suppliers', id]);
  }

  closeModal(): void {
    this.close.emit();
  }

  isMobile = false;

  ngOnInit(): void {
    this.checkViewport();
    window.addEventListener('resize', this.checkViewport.bind(this));
    this.loadSuppliers();
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
}
