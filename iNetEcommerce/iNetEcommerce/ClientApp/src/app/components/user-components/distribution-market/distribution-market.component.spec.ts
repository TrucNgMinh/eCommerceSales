import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributionMarketComponent } from './distribution-market.component';

describe('DistributionMarketComponent', () => {
  let component: DistributionMarketComponent;
  let fixture: ComponentFixture<DistributionMarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistributionMarketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributionMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
