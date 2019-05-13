import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripCostHistoryComponent } from './trip-cost-history.component';

describe('TripCostHistoryComponent', () => {
  let component: TripCostHistoryComponent;
  let fixture: ComponentFixture<TripCostHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripCostHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripCostHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
