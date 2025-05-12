import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryOverviewComponent } from './summary-overview.component';

describe('SummaryOverviewComponent', () => {
  let component: SummaryOverviewComponent;
  let fixture: ComponentFixture<SummaryOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
