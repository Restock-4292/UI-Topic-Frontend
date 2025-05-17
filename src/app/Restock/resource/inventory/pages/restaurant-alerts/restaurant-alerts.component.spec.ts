import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantAlertsComponent } from './restaurant-alerts.component';

describe('RestaurantAlertsComponent', () => {
  let component: RestaurantAlertsComponent;
  let fixture: ComponentFixture<RestaurantAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantAlertsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
