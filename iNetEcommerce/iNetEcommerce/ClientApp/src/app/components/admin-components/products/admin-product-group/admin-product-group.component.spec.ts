import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductGroupComponent } from './admin-product-group.component';

describe('AdminProductGroupComponent', () => {
  let component: AdminProductGroupComponent;
  let fixture: ComponentFixture<AdminProductGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
