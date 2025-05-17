import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SaleConfirmationComponent } from '../sale-confirmation/sale-confirmation.component';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-register-sales',
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    SaleConfirmationComponent,
    MatDivider
  ],
  templateUrl: './register-sales.component.html',
  styleUrl: './register-sales.component.css'
})
export class RegisterSalesComponent {
  @Output() cerrar = new EventEmitter<void>(); //Envento que se envia para cerrar el modal
  @Output() registersale = new EventEmitter<{ platos: any[]; insumos: any[] }>(); //Envento que se envia para cerrar el modal


  //Dinamico, cada vez que platosSeleccionados y insumosSeleccionados cambia ,la tabla tambien cambia
  platosSeleccionados = new MatTableDataSource<any>([]);
  insumosSeleccionados = new MatTableDataSource<any>([]);

  //Cerrar componente al presionar "x" o "cancel"
  cerrarComponente() {
    this.cerrar.emit(); // evento para cerrar modal
  }

  // Opciones disponibles
  platosDisponibles = [
    { id: 1, nombre: 'Lomo Saltado', precio: 20.5 },
    { id: 2, nombre: 'Arroz con Pollo', precio: 21.5 }
  ];

  insumosDisponibles = [
    { id: 1, nombre: 'Huevo', precio: 1 },
    { id: 2, nombre: 'Arroz', precio: 0.5 }
  ];


  // Columnas
  displayedColumnsPlatos: string[] = ['nombre', 'precio', 'cantidad'];
  displayedColumnsInsumos: string[] = ['nombre', 'precio', 'cantidad'];

  // Agrega plato si no está ya seleccionado
  agregarPlato(id: number) {
    console.log(this.platosSeleccionados);
    const plato = this.platosDisponibles.find(p => p.id === id);
    const data = this.platosSeleccionados.data;

    if (plato && !data.find(p => p.id === id)) {
      data.push({ ...plato, cantidad: 1 });
      this.platosSeleccionados.data = [...data]; // ← importante: forzar actualización
    }
  }

  agregarInsumo(id: number) {
    const insumo = this.insumosDisponibles.find(i => i.id === id);
    const data = this.insumosSeleccionados.data;

    if (insumo && !data.find(i => i.id === id)) {
      data.push({ ...insumo, cantidad: 1 });
      this.insumosSeleccionados.data = [...data];
    }
  }


  registerSale() {
    const platos = this.platosSeleccionados.data;
    const insumos = this.insumosSeleccionados.data;

    if (platos.length === 0 && insumos.length === 0) {
      alert('Debe seleccionar al menos un plato o insumo antes de registrar la venta.');
      return;
    }
    this.registersale.emit(
      {
        platos: this.platosSeleccionados.data,
        insumos: this.insumosSeleccionados.data
      }
    );
    this.cerrar.emit(); // Cierra el modal

  }
  //////////////////////////////////////////

}
