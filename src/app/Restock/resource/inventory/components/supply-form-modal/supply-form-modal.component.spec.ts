import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyFormModal } from './supply-form-modal.component';

describe('SupplyFormModal', () => {
  let component: SupplyFormModal;
  let fixture: ComponentFixture<SupplyFormModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplyFormModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplyFormModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
