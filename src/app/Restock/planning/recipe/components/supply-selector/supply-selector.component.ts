import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ControlValueAccessor, FormsModule} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {SupplyService} from '../../../../resource/inventory/services/supply.service';
import {TranslatePipe} from '@ngx-translate/core';
import {CatalogSupplyService} from '../../../../resource/inventory/services/catalog-supply.service';


@Component({
  selector: 'app-supply-selector',
  standalone: true,
  templateUrl: './supply-selector.component.html',
  styleUrls: ['./supply-selector.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    TranslatePipe
  ]
})
export class SupplySelectorComponent implements OnInit, ControlValueAccessor {
  @Input() supplies: any[] = [];
  @Output() suppliesChange = new EventEmitter<any[]>();

  availableSupplies: any[] = [];
  selectedSupply: any = null;
  selectedQuantity: number | null = null;

  displayedColumns: string[] = ['supplyId', 'description', 'quantity', 'actions'];

  private onChange = (_: any) => {};
  private onTouched = () => {};

  constructor(private catalogSupplyService: CatalogSupplyService) {}

  async ngOnInit(): Promise<void> {
    this.availableSupplies = await this.catalogSupplyService.getCatalogSupplies();
  }

  writeValue(value: any[]): void {
    this.supplies = value || [];
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
  }

  get internalValue(): any[] {
    return this.supplies;
  }


  addSupply() {
    const exists = this.supplies.some(s => s.supplyId === this.selectedSupply.id);
    if (!exists) {
      this.supplies = [
        ...this.supplies,
        {
          supplyId: this.selectedSupply.id,
          quantity: this.selectedQuantity
        }
      ];
      this.suppliesChange.emit(this.supplies);
    }
    this.selectedSupply = null;
    this.selectedQuantity = null;
  }

  removeSupply(index: number) {
    const updated = [...this.supplies];
    updated.splice(index, 1);
    this.supplies = updated;
    this.suppliesChange.emit(this.supplies);
  }

  getSupplyName(id: number): string {
    const match = this.availableSupplies.find(s => s.id === id);
    return match ? (match as any).name : 'Unknown';
  }
}
