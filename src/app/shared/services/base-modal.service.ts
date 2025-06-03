import {inject, Injectable, Injector} from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { BaseModalComponent } from '../components/base-modal/base-modal.component';

@Injectable({
  providedIn: 'root'
})
export class BaseModalService {

  private readonly dialog = inject(MatDialog);
  private readonly parentInjector = inject(Injector);

  open(
    config: {
      title: string;
      contentComponent: any;
      schema?: any;
      initialData?: any;
      mode?: 'create' | 'edit';
      width?: string;
      injectorValues?: Record<string, any>;
    }): MatDialogRef<BaseModalComponent> {
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

    if (config.injectorValues && Object.keys(config.injectorValues).length > 0) {
      const providers = Object.entries(config.injectorValues).map(([key, value]) => ({
        provide: key,
        useValue: value
      }));

      const customInjector = Injector.create({
        providers,
        parent: this.parentInjector
      });

      dialogConfig.injector = customInjector;
    }

    return this.dialog.open(BaseModalComponent, dialogConfig);
  }


  closeAll(): void {
    this.dialog.closeAll();
  }
}
