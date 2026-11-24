import { TestBed } from '@angular/core/testing';

import { CutiRemainingService } from './cuti-remaining.service';

describe('CutiRemainingService', () => {
  let service: CutiRemainingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CutiRemainingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
