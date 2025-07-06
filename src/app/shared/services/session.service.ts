import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private readonly ROLE_ID_KEY = 'restock_role_id';
  private readonly PROFILE_ID_KEY = 'restock_profile_id';

  // ROLE ID
  setRoleId(roleId: number): void {
    localStorage.setItem(this.ROLE_ID_KEY, roleId.toString());
  }

  getRoleId(): number | null {
    const value = localStorage.getItem(this.ROLE_ID_KEY);
    return value ? +value : null;
  }

  clearRoleId(): void {
    localStorage.removeItem(this.ROLE_ID_KEY);
  }

  // PROFILE ID
  setProfileId(profileId: number): void {
    localStorage.setItem(this.PROFILE_ID_KEY, profileId.toString());
  }

  //mas adelante cambiar el a PROFILE_ID_KEY
  getProfileId(): number | null {
    const value = localStorage.getItem(this.ROLE_ID_KEY);
    return value ? +value : null;
  }

  clearProfileId(): void {
    localStorage.removeItem(this.PROFILE_ID_KEY);
  }

  clearAll(): void {
    this.clearRoleId();
    this.clearProfileId();
  }
}
