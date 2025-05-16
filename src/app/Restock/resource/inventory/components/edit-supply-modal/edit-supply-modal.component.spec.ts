import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSupplyModalComponent } from './edit-supply-modal.component';

describe('EditSupplyModalComponent', () => {
  let component: EditSupplyModalComponent;
  let fixture: ComponentFixture<EditSupplyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSupplyModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSupplyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
