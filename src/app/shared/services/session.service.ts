import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private profileIdSubject = new BehaviorSubject<number | null>(null);
  profileId$ = this.profileIdSubject.asObservable();

  setProfileId(id: number) {
    this.profileIdSubject.next(id);
  }

  getProfileId(): number | null {
    return this.profileIdSubject.getValue();
  }
}
