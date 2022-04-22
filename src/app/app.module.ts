import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { LoginComponent } from './auth/login/login.component';
//import { RegistrationComponent } from './auth/registration/registration.component';
import { AuthModule } from './auth/auth.module';
//import { DashboardComponent } from './components/dashboard/dashboard.component';

import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HttpClientModule } from '@angular/common/http';
//import { UsersComponent } from './components/users/users.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { NuovaFatturaComponent } from './components/nuova-fattura/nuova-fattura.component';

//import { FormFatturaComponent } from './components/form-fattura/form-fattura.component';
//import { FormClienteComponent } from './components/form-cliente/form-cliente.component';
//import { FattureComponent } from './components/fatture/fatture.component';
//import { ClientiComponent } from './components/clienti/clienti.component';
//import { NavbarComponent } from './components/navbar/navbar.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./components/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  }
];

@NgModule({
  declarations: [
    AppComponent,
    //NuovaFatturaComponent,

    //FormFatturaComponent,
    //FormClienteComponent,
    //FattureComponent,
    //ClientiComponent,
    //NavbarComponent,
    //UsersComponent,
    //LoginComponent,
    //RegistrationComponent,
    //DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AuthModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
