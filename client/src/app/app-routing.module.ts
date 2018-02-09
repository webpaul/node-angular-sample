import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationsComponent } from './registrations/registrations.component'
import { DashboardComponent }   from './dashboard/dashboard.component';
import { RegistrationDetailComponent } from './registration-detail/registration-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  
  { path: 'registrations', component: RegistrationsComponent },
  { path: 'detail/:id', component: RegistrationDetailComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
