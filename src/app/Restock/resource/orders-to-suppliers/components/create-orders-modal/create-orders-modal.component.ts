import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
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
import { MatToolbar } from '@angular/material/toolbar';

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
        MatTabsModule,],
})
export class CreateOrdersModalComponent {
    // Aquí puedes definir las propiedades y métodos necesarios para el modal de creación de órdenes
    // Por ejemplo, para manejar la creación de nuevas órdenes, validaciones, etc.

    // Métodos para manejar eventos del modal
    onCreateOrder(): void {
        // Lógica para crear una nueva orden
    }

    onCancel(): void {
        // Lógica para cancelar la creación de una orden
    }
    // Modal y creación
    // Listas simuladas
    supplies = [
        { id: 1, name: 'Arroz' },
        { id: 2, name: 'Papa' }
    ];

    suppliers = [
        { id: 1, name: 'Proveedor A' },
        { id: 2, name: 'Proveedor B' }
    ];

    // Órdenes simuladas
    orders: any[] = [];
    tabIndex = 0;
    columns: string[] = ['name', 'price', 'available', 'select'];
    filteredSuppliers: any[] = [];
    selectedSuppliers: any[] = [];

    private _selectedSupply: any = null;
    get selectedSupply() {
        return this._selectedSupply;
    }
    set selectedSupply(value: any) {
        this._selectedSupply = value;
        if (value) {
            this.loadSuppliersWithPrices(value.id);
        } else {
            this.filteredSuppliers = [];
        }
    }

    @ViewChild('createOrderModal') createOrderModalRef!: TemplateRef<any>;

    constructor(private dialog: MatDialog) { }

    openCreateOrderModal() {
        this.tabIndex = 0;
        this.selectedSupply = null;
        this.filteredSuppliers = [];
        this.selectedSuppliers = [];

        this.dialog.open(this.createOrderModalRef, {
            width: '800px'
        });
    }

    closeModal() {
        this.dialog.closeAll();
    }

    nextTab() {
        this.selectedSuppliers = this.filteredSuppliers
            .filter(s => s.selected)
            .map(s => ({
                ...s,
                quantity: 0
            }));
        this.tabIndex = 1;
    }

    hasSelectedSuppliers(): boolean {
        return this.filteredSuppliers.some(s => s.selected);
    }

    getTotalOrderPrice(): number {
        return this.selectedSuppliers.reduce((sum, s) => sum + (s.quantity || 0) * s.price, 0);
    }

    addMoreSupply() {
        this.tabIndex = 0;
        this.selectedSupply = null;
        this.filteredSuppliers = [];
        this.selectedSuppliers = [];
    }

    loadSuppliersWithPrices(supplyId: number) {
        // Simulación: normalmente se hace un llamado a la API con el supplyId
        this.filteredSuppliers = [
            { supplierId: 1, name: 'Proveedor A', price: 3.5, available: 100, selected: false },
            { supplierId: 2, name: 'Proveedor B', price: 3.8, available: 50, selected: false }
        ];
    }
}