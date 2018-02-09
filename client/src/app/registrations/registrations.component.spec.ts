import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RegistrationsComponent } from './registrations.component';
import { MockComponent } from '../../test/mock.component';
import { RegistrationService } from '../registration.service';
import { MessageService } from '../message.service';

describe('RegistrationsComponent', () => {
  let component: RegistrationsComponent;
  let fixture: ComponentFixture<RegistrationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [
        RegistrationsComponent,
        MockComponent({ selector: 'app-registration-detail' })
      ],
      providers: [
        RegistrationService,
        MessageService
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data on init', async () => {
    await component.ngOnInit()
    expect(component.registrations.length).toEqual(5);
  });

  it('should track selected item', async () => {
    await component.ngOnInit()
    var selected = component.registrations[1];
    component.onSelect(selected);
    expect(component.selectedRegistration).toBeTruthy();
  });
});
