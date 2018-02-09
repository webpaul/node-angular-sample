import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { RegistrationsComponent } from './registrations/registrations.component';
import { FormsModule } from '@angular/forms';
import { RegistrationDetailComponent } from './registration-detail/registration-detail.component';
import { RegistrationService } from './registrations/registration.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './messages/message.service';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationsComponent,
    RegistrationDetailComponent,
    MessagesComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    RegistrationService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
