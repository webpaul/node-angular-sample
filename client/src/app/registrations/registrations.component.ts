import { Component, OnInit } from '@angular/core';
import { Registration } from './registration';
import { RegistrationService } from '../registration.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.css']
})

export class RegistrationsComponent implements OnInit {

  constructor(registrationService : RegistrationService, messagesComponent: MessageService) { 
    this.registrationService = registrationService;
    this.messagesComponent = messagesComponent;
  }

  private messagesComponent: MessageService;
  private registrationService: RegistrationService;

  registrations: Registration[];

  selectedRegistration: Registration;

  onSelect(registration: Registration): void {
    this.messagesComponent.add("Selected: " + registration.name);
    this.selectedRegistration = registration;
  }

  async ngOnInit() {
    this.registrations = await this.registrationService.getRegistrations();
  }

}
