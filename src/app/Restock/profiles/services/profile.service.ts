/* import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Profile } from '../model/profile.entity';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private profileSubject = new BehaviorSubject<Profile>(this.loadInitialProfile());
  profile$ = this.profileSubject.asObservable();

  getCurrentProfile(): Profile {

    return { ...this.profileSubject.value };
  }

  updateProfile(updated: Profile): void {

    this.profileSubject.next(updated);
  }

  private loadInitialProfile(): Profile {
    return {
      name: 'Elon',
      lastName: 'Musk',
      email: 'elon@gmail.com',
      phone: '+51 940 163 699',
      address: 'Av. Paseo de la República cuadra 2 - Perú',
      country: 'Perú',
      companyName: 'Alimentos S.A.',
      companyAddress: 'Av. Paseo de la República cuadra 3',
      companyCategories: ['Fast Food'],
      description: '',
      image: 'assets/admin-avatar.png'
    };
  }
}
 */


// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { Profile } from '../model/profile.entity';
// import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs/operators';
// import { environment } from '../../../../environments/environment';
// import { ProfileAssembler } from './profile.assembler';

// @Injectable({ providedIn: 'root' })
// export class ProfileService {
//   private profileSubject = new BehaviorSubject<Profile>(this.loadInitialProfile());
//   profile$ = this.profileSubject.asObservable();

//   constructor(private http: HttpClient) { }

//   getCurrentProfile(): Profile {
//     return { ...this.profileSubject.value };
//   }
//   loadProfilesByUserIds(userIds: number[]): Observable<Profile[]> {
//     if (userIds.length === 0) {
//       return new BehaviorSubject<Profile[]>([]);
//     }

//     const query = userIds.map(id => `user_id=${id}`).join('&');
//     const url = `${environment.serverBaseUrl}/profiles?${query}`;

//     return this.http.get<any[]>(url).pipe(
//       map((dtos) => dtos.map(dto => ProfileAssembler.fromDto(dto)))
//     );
//   }
//   updateProfile(updated: Profile): void {
//     this.profileSubject.next(updated);
//   }


//   loadProfileByUserId(userId: number): Observable<Profile> {
//     return this.http
//       .get<any[]>(`${environment.serverBaseUrl}/profiles?user_id=${userId}`)
//       .pipe(
//         map((profiles) => profiles[0]), // se espera solo uno
//         map((dto) => ProfileAssembler.fromDto(dto)),
//         map((profile) => {
//           this.profileSubject.next(profile);
//           return profile;
//         })
//       );
//   }

//   private loadInitialProfile(): Profile {
//     return new Profile();
//   }
// }



import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BaseService } from '../../../shared/services/base.service';
import { Profile } from '../model/profile.entity';

@Injectable({ providedIn: 'root' })
export class ProfileService extends BaseService<Profile> {
  private profileSubject = new BehaviorSubject<Profile>(this.loadInitialProfile());
  profile$ = this.profileSubject.asObservable();

  constructor() {
    super();
    this.resourceEndpoint = environment.profilesEndpointPath;
  }

  getCurrentProfile(): Profile {
    return { ...this.profileSubject.value };
  }

  updateProfile(updated: Profile): void {
    this.profileSubject.next(updated);
  }

  private loadInitialProfile(): Profile {
    return new Profile();
  }

}