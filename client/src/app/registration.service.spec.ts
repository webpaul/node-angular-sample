import { TestBed, inject } from '@angular/core/testing';

import { RegistrationService } from './registration.service';

describe('RegistrationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistrationService]
    });
  });

  it('should be created', inject([RegistrationService], (service: RegistrationService) => {
    expect(service).toBeTruthy();
  }));

  it('should return data', inject([RegistrationService], (service: RegistrationService) => {
    expect(service.getRegistrations().length).toEqual(5);
  }));
});
