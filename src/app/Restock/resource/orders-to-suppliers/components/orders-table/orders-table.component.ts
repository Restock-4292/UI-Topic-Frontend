import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'orders-table',
    templateUrl: './orders-table.component.html',
    styleUrls: ['./orders-table.component.css'],
    imports: [MatIcon],
})
export class OrdersTableComponent {
    // Aquí puedes definir las propiedades y métodos necesarios para la tabla de órdenes
    // Por ejemplo, para manejar la visualización de órdenes, selección, etc.

    constructor() {
        // Inicialización si es necesario
    }

    // Métodos para manejar eventos de la tabla
    onRowClick(order: any): void {
        // Lógica para manejar el clic en una fila de la tabla
    }

    onDeleteOrder(orderId: number): void {
        // Lógica para eliminar una orden por su ID
    }

}