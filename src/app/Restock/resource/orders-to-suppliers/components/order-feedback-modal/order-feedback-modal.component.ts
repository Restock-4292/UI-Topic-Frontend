import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { OrderToSupplier } from '../../model/order-to-supplier.entity';
import { Profile } from '../../../../profiles/model/profile.entity';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';

@Component({
    selector: 'order-feedback-modal',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatDialogModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCard,
        MatCardContent,
        MatCardHeader,
        MatCardTitle
    ],
    templateUrl: './order-feedback-modal.component.html',
    styleUrls: ['./order-feedback-modal.component.css']
})
export class OrderFeedbackModalComponent {
    @Input() order!: OrderToSupplier;
    @Input() providerProfiles: Profile[] = [];
    @ViewChild('feedbackTemplate') feedbackTemplateRef!: TemplateRef<any>;

    rating: number = 0;
    comment: string = '';

    constructor(private dialog: MatDialog) { }

    open(order: OrderToSupplier): void {
        this.order = order;
        this.dialog.open(this.feedbackTemplateRef, {
            width: '500px'
        });
    }

    close(): void {
        this.dialog.closeAll();
    }
    getSupplierProfile(): Profile | undefined {
        return this.providerProfiles.find(p => p.id === this.order?.supplier_id);
    }
    setRating(value: number): void {
        this.rating = value;
    }

    submitFeedback(): void {
        console.log('Feedback enviado:', {
            orderId: this.order.id,
            rating: this.rating,
            comment: this.comment
        });

        this.close();
    }
}
