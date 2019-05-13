import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripcostsComponent } from './tripcosts.component';

describe('TripcostsComponent', () => {
  let component: TripcostsComponent;
  let fixture: ComponentFixture<TripcostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripcostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripcostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
