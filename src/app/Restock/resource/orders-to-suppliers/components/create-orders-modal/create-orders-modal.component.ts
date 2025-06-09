import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'create-orders-modal',
    templateUrl: './create-orders-modal.component.html',
    styleUrls: ['./create-orders-modal.component.css'],
    imports: [CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        MatInputModule,
        MatTableModule,
        MatIconModule,
        MatCardModule,
        MatCheckboxModule,
        MatTabsModule],
})
export class CreateOrdersModalComponent {
    @ViewChild('createOrderModal') createOrderModalRef!: TemplateRef<any>;

    // Tabs y selección actual
    tabIndex = 0;
    selectedSupply: any = null;

    // Datos simulados
    supplies = [
        { id: 1, name: 'Arroz' },
        { id: 2, name: 'Papa' },
    ];

    // Datos de proveedores filtrados por insumo
    filteredSuppliers: any[] = [];

    // Proveedores seleccionados para el insumo actual
    currentSelections: any[] = [];

    // Acumulador de todas las selecciones (varios insumos)
    fullOrder: any[] = [];

    // Orden ascendente/descendente de precios
    sortAsc = true;

    constructor(private dialog: MatDialog) { }

    openCreateOrderModal(): void {
        this.resetAll();
        this.dialog.open(this.createOrderModalRef, {
            width: '500px',
            height: '85%',
            minHeight: '600px',
        });
    }

    closeModal(): void {
        this.dialog.closeAll();
    }

    // Paso 1: Seleccionar insumo y proveedores
    onSupplyChange(): void {
        if (!this.selectedSupply) {
            this.filteredSuppliers = [];
            return;
        }

        // Buscar proveedores ya seleccionados para este insumo
        const alreadySelected = this.fullOrder
            .filter(o => o.supplyId === this.selectedSupply.id)
            .map(o => o.supplierId);

        // Simula carga de proveedores desde API y desactiva los ya seleccionados
        this.filteredSuppliers = [
            { supplierId: 1, name: 'Proveedor A', price: 3.5, available: 100 },
            { supplierId: 2, name: 'Proveedor B', price: 3.8, available: 50 }
        ].map(s => {
            const already = this.fullOrder.find(o =>
                o.supplierId === s.supplierId && o.supplyId === this.selectedSupply.id
            );
            return {
                ...s,
                selected: !!already,
                disabled: !!already
            };
        });

    }

    toggleSortOrder(): void {
        this.sortAsc = !this.sortAsc;
        this.filteredSuppliers.sort((a, b) =>
            this.sortAsc ? a.price - b.price : b.price - a.price
        );
    }

    hasSelection(): boolean {
        return this.filteredSuppliers.some(s => s.selected);
    }

    nextTab(): void {
        const selected = this.filteredSuppliers.filter(s => s.selected);
        console.log('Proveedores seleccionados:', selected);
        this.currentSelections = selected.map(s => ({
            ...s,
            supplyId: this.selectedSupply.id,
            supplyName: this.selectedSupply.name,
            quantity: 1,
        }));

        this.tabIndex = 1;
    }

    // Paso 2: Confirmar pedido
    addMoreSupply(): void {
        this.fullOrder.push(...this.currentSelections);
        console.log('Pedido acumulado:', this.fullOrder);
        this.resetStep();
    }

    onCreateOrder(): void {
        const finalOrder = [...this.fullOrder, ...this.currentSelections];
        console.log('Orden final:', finalOrder);
        this.closeModal();
    }

    getTotal(): number {
        return this.currentSelections.reduce((sum, s) => {
            const qty = s.quantity || 1;
            return sum + s.price * qty;
        }, 0);
    }


    // Utilidades
    private resetStep(): void {
        this.selectedSupply = null;
        this.filteredSuppliers = [];
        this.currentSelections = [];
        this.tabIndex = 0;
    }

    private resetAll(): void {
        this.fullOrder = [];
        this.resetStep();
    }
}