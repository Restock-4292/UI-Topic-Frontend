import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {environment} from '../../../../../../environments/environment';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {FormsModule} from '@angular/forms';
import {MatDivider} from '@angular/material/divider';
import {MatButton, MatIconButton} from '@angular/material/button';
import {NgForOf, NgIf} from '@angular/common';
import {SupplierModalComponent} from '../../components/supplier-modal/supplier-modal.component';
import {MatIcon} from '@angular/material/icon';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {firstValueFrom} from 'rxjs';

interface Supplier {
  id: number;
  name: string;
  email: string;
  category: string;
  status?: boolean;
  added?: boolean;
}

@Component({
  selector: 'app-supplier-overview',
  templateUrl: './supplier-overview.component.html',
  styleUrl: './supplier-overview.component.css',
  standalone: true,
  imports: [
    MatFormField,
    MatSlideToggle,
    FormsModule,
    MatDivider,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatIconButton,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatPaginator,
    NgIf,
    SupplierModalComponent,
    MatIcon,
    MatInput,
    MatOption,
    MatSelect,
    MatOption,
    NgForOf,
    MatButton,
    MatHeaderRowDef
  ]
})
export class SupplierOverviewComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  suppliers: Supplier[] = [];
  dataSource = new MatTableDataSource<Supplier>([]);
  categories: string[] = [];
  searchText = '';
  selectedCategory = '';
  onlyActive = false;
  isMobile = false;
  showAddSupplierModal = false;

  readonly API_URL = environment.serverBaseUrl;
  readonly RESTAURANT_ID = 2;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.showAddSupplierModal = params['addSupplier'] === 'true';
    });
    this.checkViewport();
    window.addEventListener('resize', this.checkViewport.bind(this));

    this.loadSuppliers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  async loadSuppliers(): Promise<void> {
    try {
      const links = await firstValueFrom(
        this.http.get<any[]>(`${this.API_URL}/restaurant_suppliers?restaurant_id=${this.RESTAURANT_ID}`)
      );
      const supplierPromises = links.map(link =>
        firstValueFrom(this.http.get<any>(`${this.API_URL}/users/${link.supplier_id}`))
      );

      const supplierData = await Promise.all(supplierPromises);

      this.suppliers = supplierData.map(s => ({
        id: s.id,
        name: s.name,
        email: s.email,
        category: s.category || 'Uncategorized',
        status: s.status ?? true,
        added: true
      }));

      this.categories = [...new Set(this.suppliers.map(s => s.category))];
      this.dataSource.data = this.suppliers;
      this.dataSource.filterPredicate = (data: Supplier, _: string): boolean => {
        const matchesText = data.name.toLowerCase().includes(this.searchText.toLowerCase());
        const matchesCategory = this.selectedCategory ? data.category === this.selectedCategory : true;
        const matchesStatus = this.onlyActive ? data.status === true : true;
        return matchesText && matchesCategory && matchesStatus;
      };

    } catch (error) {
      console.error('Error loading suppliers:', error);
    }
  }

  applyFilters(): void {
    this.dataSource.filter = `${Math.random()}`; // fuerza reevaluación
  }

  get hasSuppliers(): boolean {
    return this.suppliers.length > 0;
  }

  getColumns(): string[] {
    return this.isMobile
      ? ['name', 'category', 'catalog']
      : ['name', 'category', 'email', 'catalog'];
  }

  goToDetail(id: number): void {
    this.router.navigate(['/dashboard/restaurant/suppliers', id]);
  }

  openAddSupplierModal(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {addSupplier: true},
      queryParamsHandling: 'merge'
    });
  }

  closeModal(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {addSupplier: null},
      queryParamsHandling: 'merge'
    });
  }

  checkViewport(): void {
    this.isMobile = window.innerWidth <= 900;
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.checkViewport.bind(this));
  }
}
