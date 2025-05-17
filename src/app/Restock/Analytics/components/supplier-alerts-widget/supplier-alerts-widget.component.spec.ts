import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierAlertsWidgetComponent } from './supplier-alerts-widget.component';

describe('SupplierAlertsWidgetComponent', () => {
  let component: SupplierAlertsWidgetComponent;
  let fixture: ComponentFixture<SupplierAlertsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierAlertsWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierAlertsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
