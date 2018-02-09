import { Component, OnInit } from '@angular/core';
import { Registration } from './registration';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.css']
})

export class RegistrationsComponent implements OnInit {

  constructor(registrationService : RegistrationService) { 
    this.registrationService = registrationService;
  }

  private registrationService: RegistrationService;

  registrations: Registration[];

  selectedRegistration: Registration;

  onSelect(registration: Registration): void {
    this.selectedRegistration = registration;
  }

  async ngOnInit() {
    this.registrations = await this.registrationService.getRegistrations();
  }

}
