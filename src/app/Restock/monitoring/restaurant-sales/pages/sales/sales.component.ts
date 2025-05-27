import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { RegisterSalesComponent } from '../../components/register-sales/register-sales.component';
import { CommonModule } from '@angular/common';
import { SaleConfirmationComponent } from '../../components/sale-confirmation/sale-confirmation.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ShowSalesNotAddedToInventoryComponent } from '../../components/show-sales-not-added-to-inventory/show-sales-not-added-to-inventory.component';

// Sale interface to define the shape of sales data
interface Sale {
  date: string;
  dishes: any[];
  supplies: any[];
}

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    RegisterSalesComponent,
    SaleConfirmationComponent,
    ShowSalesNotAddedToInventoryComponent
  ],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent implements OnInit {

  // Columns to be displayed in the sales history table
  displayedColumns: string[] = ['code', 'plates', 'additonal_supplies', 'actions'];

  // Sample data for sales already added to inventory
  dataSource = new MatTableDataSource<any>([
    { code: "C7Y5ND2", quantity_plates: 2, quantity_additonal_supplies: 4 },
    { code: "AQWE4TG", quantity_plates: 3, quantity_additonal_supplies: 8 },
    { code: "ZSWEDC5", quantity_plates: 3, quantity_additonal_supplies: 4 },
    { code: "CV8ESXD", quantity_plates: 6, quantity_additonal_supplies: 6 },
    { code: "BJIWS52", quantity_plates: 5, quantity_additonal_supplies: 2 },
    { code: "ABVDTB1", quantity_plates: 3, quantity_additonal_supplies: 7 },
    { code: "BUDCS19", quantity_plates: 11, quantity_additonal_supplies: 4 },
  ]);

  // Reference to the paginator component
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Assign the paginator to the table data after the view initializes
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // Filter the table by sale code
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  // Modal flags to control visibility
  showModalRegisterSale = false;               // Controls visibility of register-sale modal
  showModalSaleConfirmation = false;           // Controls visibility of sale-confirmation modal
  showModalSalesNotAddedToInventory = false;   // Controls visibility of pending-sales modal

  // Array of sales not yet added to inventory
  salesNotAddedToInventory: Sale[] = [];

  // Indicates whether there are historical sales already added to inventory
  showHistorySalesAddedInInventory = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  // Initialize modal flags based on URL query parameters
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.showModalRegisterSale = params['registerSale'] === 'true';
      this.showModalSalesNotAddedToInventory = params['salesNotAddedToInventory'] === 'true';
    });
  }

  // Open the register sale modal by updating the URL query param
  openRegisterSaleModal() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { registerSale: true },
      queryParamsHandling: 'merge'
    });
  }

  // Open the modal showing sales not yet added to inventory
  openSalesNotAddedToInventoryModal() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { salesNotAddedToInventory: true },
      queryParamsHandling: 'merge'
    });
  }

  // Close the register sale modal by clearing the URL query param
  closeRegisterSaleModal(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { registerSale: null },
      queryParamsHandling: 'merge'
    });
  }

  // Close the pending sales modal
  closeSalesNotAddedToInventoryModal(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { salesNotAddedToInventory: null },
      queryParamsHandling: 'merge'
    });
  }

  // Close the sale confirmation modal
  closeSaleConfirmationModal(): void {
    this.showModalSaleConfirmation = false;
  }

  // Handle registration of a new sale
  onRegisterSale(data: { dishes: any[]; additionalSupplies: any[] }) {
    const newSale: Sale = {
      date: new Date().toISOString(),
      dishes: data.dishes,
      supplies: data.additionalSupplies
    };

    // Simulate storing the new sale in the backend
    this.salesNotAddedToInventory.push(newSale);

    // Show the confirmation modal if registration was successful
    this.showModalSaleConfirmation = true;
  }

}
