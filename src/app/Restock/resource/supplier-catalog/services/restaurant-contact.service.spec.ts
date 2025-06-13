import { TestBed } from '@angular/core/testing';

import { RestaurantContactAssemblerService } from './restaurant-contact.service';

describe('RestaurantContactAssemblerService', () => {
  let service: RestaurantContactAssemblerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantContactAssemblerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
