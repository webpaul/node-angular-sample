import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { RegistrationsComponent } from './registrations/registrations.component';
import { FormsModule } from '@angular/forms';
import { RegistrationDetailComponent } from './registration-detail/registration-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationsComponent,
    RegistrationDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
