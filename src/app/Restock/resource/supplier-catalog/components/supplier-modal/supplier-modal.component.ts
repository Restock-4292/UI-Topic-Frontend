import {AfterViewInit, Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatIcon} from '@angular/material/icon';
import {Router} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatFormField, MatInput, MatPrefix} from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';
import {mockSuppliers} from '../../../../../shared/mocks/suppliers.mock';

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
  suppliers = mockSuppliers;
  dataSource = new MatTableDataSource(this.suppliers);

  constructor(private router: Router) {}

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

  ngOnInit() {
    this.checkViewport();
    window.addEventListener('resize', this.checkViewport.bind(this));
  }
  checkViewport(): void {
    this.isMobile = window.innerWidth <= 800;
  }
  ngOnDestroy() {
    window.removeEventListener('resize', this.checkViewport.bind(this));
  }

  getColumns(): string[] {
    return this.isMobile ? this.mobileColumns : this.displayedColumns;
  }
}
