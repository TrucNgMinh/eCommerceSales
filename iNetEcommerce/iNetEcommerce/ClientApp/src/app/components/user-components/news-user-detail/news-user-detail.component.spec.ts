import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsUserDetailComponent } from './news-user-detail.component';

describe('NewsUserDetailComponent', () => {
  let component: NewsUserDetailComponent;
  let fixture: ComponentFixture<NewsUserDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsUserDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsUserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
