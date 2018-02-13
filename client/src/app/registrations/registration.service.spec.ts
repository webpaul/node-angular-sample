import { TestBed, inject } from '@angular/core/testing';

import { RegistrationService } from './registration.service';
import { MessageService } from '../messages/message.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Registration } from './registration';

describe('RegistrationService', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        RegistrationService,
        MessageService,
        HttpClient,
        HttpHandler
      ]
    });

    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([RegistrationService], (service: RegistrationService) => {
    expect(service).toBeTruthy();
  }));

  /*fit('should return data', inject([RegistrationService], async (service: RegistrationService) => {
    var data = await service.getRegistrations();
    const req = httpMock.expectOne(service.apiUrl);
    req.flush([{ _id: 'test' }]);
    expect(data.length).toEqual(1);
    expect(data[0].id).toEqual('test');

    httpMock.verify();
  }));*/
});
