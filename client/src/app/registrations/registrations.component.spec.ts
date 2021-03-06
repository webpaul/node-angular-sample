import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RegistrationsComponent } from './registrations.component';
import { MockComponent } from '../../test/mock.component';
import { RegistrationService } from './registration.service';
import { MessageService } from '../messages/message.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpHandler } from '@angular/common/http';
import { Registration } from './registration';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('RegistrationsComponent', () => {
  let component: RegistrationsComponent;
  let fixture: ComponentFixture<RegistrationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        RegistrationsComponent,
        MockComponent({ selector: 'app-registration-detail' })
      ],
      providers: [
        RegistrationService,
        MessageService,
        HttpHandler
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  var service: RegistrationService = null;

  beforeEach(() => {
    this.service = TestBed.get(RegistrationService);
    spyOn(this.service, 'getRegistrations').and.returnValue(Promise.resolve([{}, {}]));

    fixture = TestBed.createComponent(RegistrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data on init', async () => {
    await component.ngOnInit()
    expect(component.registrations.length).toEqual(2);
  });
});
