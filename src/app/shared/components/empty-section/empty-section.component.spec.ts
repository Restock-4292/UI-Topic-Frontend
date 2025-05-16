import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptySection } from './empty-section.component';

describe('EmptySection', () => {
  let component: EmptySection;
  let fixture: ComponentFixture<EmptySection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptySection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptySection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
