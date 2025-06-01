import { Component, Inject, Injector } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NgComponentOutlet, CommonModule } from '@angular/common';
import {MatButtonModule, MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-base-modal',
  standalone: true,
  templateUrl: './base-modal.component.html',
  styleUrls: ['./base-modal.component.css'],
  imports: [
    CommonModule,
    MatIconModule,
    NgComponentOutlet,
    MatIconButton,
    MatButtonModule
  ]
})
export class BaseModalComponent {
  injectorInstance: Injector;

  constructor(
    public dialogRef: MatDialogRef<BaseModalComponent>,
    private injector: Injector,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      contentComponent: any;
      schema?: any;
      initialData?: any;
      mode?: 'create' | 'edit';
    }
  ) {
    // Crear el Injector una sola vez para evitar recreaciones infinitas
    this.injectorInstance = Injector.create({
      providers: [
        { provide: 'schema', useValue: data.schema },
        { provide: 'initialData', useValue: data.initialData },
        { provide: 'mode', useValue: data.mode }
      ],
      parent: this.injector
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
