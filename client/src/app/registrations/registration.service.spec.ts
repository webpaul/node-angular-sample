import { TestBed, inject } from '@angular/core/testing';

import { RegistrationService } from './registration.service';
import { MessageService } from '../messages/message.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Registration } from './registration';

describe('RegistrationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        RegistrationService,
        MessageService,
        HttpClient
      ]
    });
  });

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));  

  it('should be created', inject([HttpTestingController, RegistrationService], (httpMock: HttpTestingController, service: RegistrationService) => {
    expect(service).toBeTruthy();
    httpMock.expectNone(service.apiUrl);
  }));

  it('should return data', inject([HttpTestingController, RegistrationService], async (httpMock: HttpTestingController, service: RegistrationService) => {
    var promise = service.getRegistrations();
    
    httpMock.expectOne(service.apiUrl).flush([{ _id: 'test' }]);
    
    var data = await promise;
    expect(data.length).toBe(1);
  }));
});
