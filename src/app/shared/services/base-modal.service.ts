import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { BaseModalComponent } from '../components/base-modal/base-modal.component';

@Injectable({
  providedIn: 'root'
})
export class BaseModalService {
  constructor(private dialog: MatDialog) {}

  open(
    config: {
      title: string;
      contentComponent: any;
      schema?: any;
      initialData?: any;
      mode?: 'create' | 'edit';
      width?: string;
    }
  ): MatDialogRef<BaseModalComponent> {
    const dialogConfig: MatDialogConfig = {
      disableClose: false,
      autoFocus: true,
      width: config.width || '35rem',
      panelClass: 'dialog-unified-size',
      data: {
        title: config.title,
        contentComponent: config.contentComponent,
        schema: config.schema,
        initialData: config.initialData,
        mode: config.mode
      }
    };

    return this.dialog.open(BaseModalComponent, dialogConfig);
  }


  closeAll(): void {
    this.dialog.closeAll();
  }
}
