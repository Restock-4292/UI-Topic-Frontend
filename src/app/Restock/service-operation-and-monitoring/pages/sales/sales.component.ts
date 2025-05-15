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

interface Orden {
  fecha: string;
  platos: any[];
  insumos: any[];
}
@Component({
  selector: 'app-sales',
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatDividerModule,
    RegisterSalesComponent,
    SaleConfirmationComponent,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})


export class SalesComponent implements OnInit {
  //Tables of history sales added in inventory
  displayedColumns: string[] = ['code', 'plates', 'additonal_supplies', 'actions'];
  dataSource = new MatTableDataSource<any>(
    [
      { code: "C7Y5ND2", quantity_plates: 2, quantity_additonal_supplies: 4 },
      { code: "AQWE4TG", quantity_plates: 3, quantity_additonal_supplies: 8 },
      { code: "ZSWEDC5", quantity_plates: 3, quantity_additonal_supplies: 4 },
      { code: "CV8ESXD", quantity_plates: 6, quantity_additonal_supplies: 6 },
      { code: "BJIWS52", quantity_plates: 5, quantity_additonal_supplies: 2 },
      { code: "ABVDTB1", quantity_plates: 3, quantity_additonal_supplies: 7 },
      { code: "BUDCS19", quantity_plates: 11, quantity_additonal_supplies: 4 },
    ]);

  //Paginator of table
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  //Apllying filter for searching by code
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }


  //Show the register Modal: register a sale
  mostrarRegistroVenta = false;
  //Show Confirmation Modal of sale completed
  mostrarSaleConfirmation = false;
  // <-- Array that contains orders, this orders will show in a modal component
  sales: Orden[] = [];
  salesAddedToInventory: Orden[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    //show the register modal if the query from the url registerSale is true
    this.route.queryParams.subscribe(params => {
      this.mostrarRegistroVenta = params['registerSale'] === 'true';
    });
  }

  // show the register modal and put the registerSale ==true
  toggleRegistroVenta() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { registerSale: true },
      queryParamsHandling: 'merge'
    });
  }

  //close the modal: query registerSale == false
  closeModal(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { registerSale: null },
      queryParamsHandling: 'merge'
    });
  }

  //Register a sale 
  onRegisterSale(data: { platos: any[]; insumos: any[] }) {

    //Simulating creating a sale in backend
    const newSale: Orden = {
      fecha: new Date().toISOString(),
      platos: data.platos,
      insumos: data.insumos
    };

    //Simulando tener las ordenes ya registradas en base de datos
    this.sales.push(newSale);

    // if the order was created succesfully ,then show saleConfirmation modal
    this.mostrarSaleConfirmation = true;
  }

  // Check on the backend whether any sales records have the 'AddedInInventory' field set
  showHistorySalesAddedinInventory = true;

}
