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
    @Input() suppliers: { id: number; name: string }[] = [];

    @Output() orderSelected = new EventEmitter<number>();
    @Output() deleteOrder = new EventEmitter<number>();
    @Output() viewDetails = new EventEmitter<OrderToSupplier>();

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

    onViewDetails(order: any): void {
        this.viewDetails.emit(order);
    }
    getSupplierName(supplierId: number): string {
        const supplier = this.suppliers.find(s => s.id === supplierId);
        return supplier ? supplier.name : 'Unknown';
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
