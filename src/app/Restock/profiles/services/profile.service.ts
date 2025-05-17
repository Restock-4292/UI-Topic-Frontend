import { Injectable } from '@angular/core';
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
