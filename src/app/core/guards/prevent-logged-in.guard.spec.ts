import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { preventLoggedInGuard } from './prevent-logged-in.guard';

describe('preventLoggedInGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => preventLoggedInGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
