import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sale-confirmation',
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './sale-confirmation.component.html',
  styleUrl: './sale-confirmation.component.css'
})
export class SaleConfirmationComponent {

  @Output() cerrar = new EventEmitter<void>(); //Envento que se envia para cerrar el modal

  cerrarComponente() {
    this.cerrar.emit(); // evento para cerrar modal
  }
}
