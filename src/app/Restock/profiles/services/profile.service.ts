import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Profile, subscriber } from '../model/profile.entity';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profileSubject = new BehaviorSubject<Profile>(subscriber);
  profile$ = this.profileSubject.asObservable();

  updateProfile(updated: Profile) {
    this.profileSubject.next(updated);
  }

  getCurrentProfile(): Profile {
    return this.profileSubject.getValue();
  }
}
