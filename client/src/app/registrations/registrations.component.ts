import { Component, OnInit } from '@angular/core';
import { Registration } from './registration';
import { RegistrationService } from './registration.service';
import { MessageService } from '../messages/message.service';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.css']
})

export class RegistrationsComponent implements OnInit {

  constructor(private registrationService : RegistrationService) { }

  registrations: Registration[];

  async ngOnInit() {
    this.registrations = await this.registrationService.getRegistrations();
  }

}
