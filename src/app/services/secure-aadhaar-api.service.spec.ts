import { TestBed, inject } from '@angular/core/testing';

import { SecureAadhaarApiService } from './secure-aadhaar-api.service';

describe('SecureAadhaarApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecureAadhaarApiService]
    });
  });

  it('should be created', inject([SecureAadhaarApiService], (service: SecureAadhaarApiService) => {
    expect(service).toBeTruthy();
  }));
});
