import { Component, OnInit } from '@angular/core';
import { Registration } from '../registrations/registration';
import { RegistrationService } from '../registrations/registration.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  registrations: Registration[] = [];

  constructor(private registrationService: RegistrationService) { }

  ngOnInit() {
    this.getRegistrations();
  }

  async getRegistrations(): Promise<void> {
    var items = await this.registrationService.getRegistrations();
    this.registrations = items.slice(0, 3);
  }
}