import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantAlertsWidgetComponent } from './restaurant-alerts-widget.component';

describe('RestaurantAlertsWidgetComponent', () => {
  let component: RestaurantAlertsWidgetComponent;
  let fixture: ComponentFixture<RestaurantAlertsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantAlertsWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantAlertsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
