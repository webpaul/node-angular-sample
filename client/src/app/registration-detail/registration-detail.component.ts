import { Component, OnInit, Input } from '@angular/core';
import { Registration } from '../registrations/registration';

@Component({
  selector: 'app-registration-detail',
  templateUrl: './registration-detail.component.html',
  styleUrls: ['./registration-detail.component.css']
})
export class RegistrationDetailComponent implements OnInit {

  constructor() { }

  @Input() registration: Registration;

  ngOnInit() {
  }

}
