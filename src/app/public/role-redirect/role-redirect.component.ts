import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { mockUser } from '../../shared/mocks/user.mock';


@Component({
    selector: 'app-role-redirect',
    standalone: true,
    imports: [CommonModule],
    template: `<p>Redirecting...</p>`,
})
export class RoleRedirectComponent {
    router = inject(Router);

    constructor() {
        const role = mockUser.role_id.name;
        if (role === 'restaurant') {
            this.router.navigate(['/dashboard/restaurant']);
        } else if (role === 'supplier') {
            this.router.navigate(['/dashboard/supplier']);
        } else {
            this.router.navigate(['/not-found']); // fallback
        }
    }
}