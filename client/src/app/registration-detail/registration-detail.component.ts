import { Component, OnInit, Input } from '@angular/core';
import { Registration } from '../registrations/registration';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { RegistrationService }  from '../registrations/registration.service';

@Component({
  selector: 'app-registration-detail',
  templateUrl: './registration-detail.component.html',
  styleUrls: ['./registration-detail.component.css']
})
export class RegistrationDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private registrationService: RegistrationService,
    private location: Location) 
  { }

  @Input() registration: Registration;

  async ngOnInit() {
    var item = await this.registrationService.getRegistration(+this.route.snapshot.paramMap.get('id'));
    this.registration = item;
  }

}
