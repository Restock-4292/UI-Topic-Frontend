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
  selector: 'app-show-sales-not-added-to-inventory',
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
  templateUrl: './show-sales-not-added-to-inventory.component.html',
  styleUrl: './show-sales-not-added-to-inventory.component.css'
})
export class ShowSalesNotAddedToInventoryComponent {
  @Output() cerrar = new EventEmitter<void>(); //Envento que se envia para cerrar el modal
  // @Output() registersale = new EventEmitter<{ platos: any[]; insumos: any[] }>(); //Envento que se envia para cerrar el modal


  salesNotAddedToInventory = new MatTableDataSource<any>(
    [
      { code: "C7Y5ND2", quantity_plates: 2, quantity_additonal_supplies: 4 },
      { code: "AQWE4TG", quantity_plates: 3, quantity_additonal_supplies: 8 },
      { code: "ZSWEDC5", quantity_plates: 3, quantity_additonal_supplies: 4 },
      { code: "CV8ESXD", quantity_plates: 6, quantity_additonal_supplies: 6 },
      { code: "BJIWS52", quantity_plates: 5, quantity_additonal_supplies: 2 },
      { code: "ABVDTB1", quantity_plates: 3, quantity_additonal_supplies: 7 },
      { code: "BUDCS19", quantity_plates: 11, quantity_additonal_supplies: 4 },
    ]);

  //Cerrar componente al presionar "x" o "cancel"
  cerrarComponente() {
    this.cerrar.emit(); // evento para cerrar modal
  }

  // Columnas
  displayedColumnssalesNotAddedToInventory: string[] = ['code', 'quantity_plates', 'quantity_additonal_supplies', 'actions'];

  //sales selected to move to inventory
  selectedSales: any[] = [];

  toggleSelection(element: any, checked: boolean) {
    if (checked) {
      this.selectedSales.push(element);
    } else {
      this.selectedSales = this.selectedSales.filter(s => s.code !== element.code);
    }
    console.log("selected sales: ", this.selectedSales);
  }

  isSelected(element: any): boolean {
    return this.selectedSales.some(s => s.code === element.code);
  }

}
