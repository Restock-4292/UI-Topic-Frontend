import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SupplierModalComponent} from '../../components/supplier-modal/supplier-modal.component';
import {NgForOf, NgIf} from '@angular/common';
import {mockSuppliers} from '../../../../../shared/mocks/suppliers.mock';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatPaginator} from '@angular/material/paginator';
import {MatDivider} from '@angular/material/divider';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
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

interface Supplier {
  id: number;
  name: string;
  category: string;
  email: string;
  added?: boolean;
  status?: boolean;
}

@Component({
  selector: 'app-supplier-overview',
  standalone: true,
  templateUrl: './supplier-overview.component.html',
  styleUrl: './supplier-overview.component.css',
  imports: [
    SupplierModalComponent,
    NgForOf,
    NgIf,
    MatIcon,
    MatIconButton,
    MatPaginator,
    MatButton,
    MatDivider,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTable,
    MatColumnDef,
    MatCellDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef
  ]
})
export class SupplierOverviewComponent implements OnInit, AfterViewInit {
  searchText = '';
  selectedCategory = '';
  onlyActive = false;

  showAddSupplierModal = false;
  displayedColumns: string[] = ['name', 'category', 'email', 'catalog'];
  mobileColumns: string[] = ['name', 'category', 'catalog'];
  dataSource = new MatTableDataSource<Supplier>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  suppliers: Supplier[] = [];
  categories: string[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.showAddSupplierModal = params['addSupplier'] === 'true';
    });

    this.suppliers = mockSuppliers.filter(s => s.added);
    this.categories = [...new Set(this.suppliers.map(s => s.category))];

    this.dataSource.data = this.suppliers;
    this.dataSource.filterPredicate = (data: Supplier, filter: string): boolean => {
      const matchesText = data.name.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesCategory = this.selectedCategory ? data.category === this.selectedCategory : true;
      const matchesStatus = this.onlyActive ? data.status === true : true;

      return matchesText && matchesCategory && matchesStatus;
    };

    this.checkViewport();
    window.addEventListener('resize', this.checkViewport.bind(this));
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilters(): void {
    this.dataSource.filter = `${Math.random()}`; // fuerza el refresh del filtro
  }

  get hasSuppliers(): boolean {
    return this.suppliers.length > 0;
  }

  openAddSupplierModal(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { addSupplier: true },
      queryParamsHandling: 'merge'
    });
  }

  closeModal(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { addSupplier: null },
      queryParamsHandling: 'merge'
    });
  }

  goToDetail(id: number): void {
    this.router.navigate(['/dashboard/restaurant/suppliers', id]);
  }


  isMobile = false;

  checkViewport(): void {
    this.isMobile = window.innerWidth <= 900;
  }
  ngOnDestroy() {
    window.removeEventListener('resize', this.checkViewport.bind(this));
  }

  getColumns(): string[] {
    return this.isMobile ? this.mobileColumns : this.displayedColumns;
  }
}
