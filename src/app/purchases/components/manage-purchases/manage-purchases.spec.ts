import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePurchases } from './manage-purchases';

describe('ManagePurchases', () => {
  let component: ManagePurchases;
  let fixture: ComponentFixture<ManagePurchases>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagePurchases]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagePurchases);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
