import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverImagesComponent } from './driver-images.component';

describe('DriverImagesComponent', () => {
  let component: DriverImagesComponent;
  let fixture: ComponentFixture<DriverImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
