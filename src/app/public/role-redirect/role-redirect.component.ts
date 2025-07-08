import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {SessionService} from '../../shared/services/session.service';
import {ProfileService} from '../../Restock/profiles/services/profile.service';


@Component({
    selector: 'app-role-redirect',
    standalone: true,
    imports: [CommonModule],
    template: `<p>Redirecting...</p>`,
})
export class RoleRedirectComponent {
    router = inject(Router);

    private sessionService: SessionService = inject(SessionService);
    private profileService: ProfileService = inject(ProfileService);



    constructor() {

        const profileId = this.sessionService.getProfileId();
        if(!profileId){
          this.router.navigate([`/dashboard/${this.sessionService.getProfileId() ? 'restaurant' : 'supplier'}`]);
          return;
        }

        this.profileService.getProfileById(profileId)
          .then(profile =>{
            const roleName = profile.user?.role_id === 1 ? 'supplier' : 'restaurant';

            if(roleName == 'restaurant'){
              this.router.navigate(['/dashboard/restaurant']);
            }else if(roleName == 'supplier'){
              this.router.navigate(['/dashboard/supplier']);
            }else {
              this.router.navigate(['/not-found']); // fallback
            }
          }).catch(error => {
            this.router.navigate(['/not-found']);
          })
    }
}
