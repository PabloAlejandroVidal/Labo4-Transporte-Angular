import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { termsGuard } from './terms.guard';

describe('termsGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => termsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
