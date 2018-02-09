import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { RegistrationsComponent } from './registrations/registrations.component';
import { FormsModule } from '@angular/forms';
import { RegistrationDetailComponent } from './registration-detail/registration-detail.component';
import { RegistrationService } from './registrations/registration.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './messages/message.service';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationsComponent,
    RegistrationDetailComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    RegistrationService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
