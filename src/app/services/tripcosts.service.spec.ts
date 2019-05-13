import { TestBed } from '@angular/core/testing';

import { TripcostsService } from './tripcosts.service';

describe('TripcostsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TripcostsService = TestBed.get(TripcostsService);
    expect(service).toBeTruthy();
  });
});
