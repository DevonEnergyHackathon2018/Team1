import { TestBed } from '@angular/core/testing';

import { NetworkAvailabilityService } from './network-availability.service';

describe('NetworkAvailabilityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NetworkAvailabilityService = TestBed.get(NetworkAvailabilityService);
    expect(service).toBeTruthy();
  });
});
