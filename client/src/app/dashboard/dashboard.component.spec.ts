import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { RegistrationService } from '../registrations/registration.service';
import { MessageService } from '../messages/message.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
         DashboardComponent 
      ],
      providers: [ 
        RegistrationService,
        MessageService,
        HttpClient, 
        HttpHandler
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    this.service = TestBed.get(RegistrationService);
    spyOn(this.service, 'getRegistrations').and.returnValue(Promise.resolve([]));

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
