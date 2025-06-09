import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIf, DatePipe, NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { OrderToSupplier } from '../../model/order-to-supplier.entity';

@Component({
    selector: 'orders-table',
    templateUrl: './orders-table.component.html',
    styleUrls: ['./orders-table.component.css'],
    standalone: true,
    imports: [NgIf, NgClass, MatIconModule, MatTableModule, MatButtonModule, DatePipe],
})
export class OrdersTableComponent {
    @Input() orders: OrderToSupplier[] = [];
    @Output() orderSelected = new EventEmitter<number>();
    @Output() deleteOrder = new EventEmitter<number>();

    displayedColumns: string[] = [
        'situation',
        'state',
        'date',
        'supplier',
        'requestedProducts',
        'totalPrice',
        'actions',
        'notifications'
    ];

    onRowClick(order: OrderToSupplier): void {
        this.orderSelected.emit(order.id);
    }

    onDeleteOrder(orderId: number): void {
        this.deleteOrder.emit(orderId);
    }

    onViewDetails(orderId: number): void {
        console.log('View details of order', orderId);
    }
    getSituationClass(situationName: string | undefined): string {
        switch ((situationName || '').toLowerCase()) {
            case 'pending':
                return 'situation-pending';
            case 'approved':
                return 'situation-approved';
            case 'declined':
                return 'situation-declined';
            default:
                return '';
        }
    }
}
