import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { RegisterSalesComponent } from '../../components/register-sales/register-sales.component';
import { CommonModule } from '@angular/common';
import { SaleConfirmationComponent } from '../../components/sale-confirmation/sale-confirmation.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sales',
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatDividerModule,
    RegisterSalesComponent,
    SaleConfirmationComponent
  ],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})


export class SalesComponent implements OnInit {
  mostrarRegistroVenta = false; //muestra el modal de registro de un comensal
  mostrarSaleConfirmation = false; //muestra modal de confimracion de venta realizada

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.mostrarRegistroVenta = params['registerSale'] === 'true';
    });
  }

  toggleRegistroVenta() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { registerSale: true },
      queryParamsHandling: 'merge'
    });
  }

  closeModal(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { registerSale: null },
      queryParamsHandling: 'merge'
    });
  }

  onRegisterSale(data: { platos: any[]; insumos: any[] }) {
    // Aquí puedes hacer fetch si necesitas, y luego abrir el modal
    console.log("data de registerSale: ", data);
    //si la respuesta del fecth es exitosa entonces se abre modal de confirmacion
    // Abre modal de confirmación
    this.mostrarSaleConfirmation = true;
  }

}
