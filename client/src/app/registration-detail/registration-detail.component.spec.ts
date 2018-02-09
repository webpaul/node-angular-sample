import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { RegistrationDetailComponent } from './registration-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RegistrationService } from '../registrations/registration.service';
import { MessageService } from '../messages/message.service';

describe('RegistrationDetailComponent', () => {
  let component: RegistrationDetailComponent;
  let fixture: ComponentFixture<RegistrationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        FormsModule,
        RouterTestingModule
      ],
      declarations: [ 
        RegistrationDetailComponent 
      ],
      providers: [
        RegistrationService,
        MessageService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
