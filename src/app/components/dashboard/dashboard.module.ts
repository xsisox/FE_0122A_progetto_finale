import { FattureModule } from './../fatture/fatture.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NavbarComponent } from '../navbar/navbar.component';



const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'clienti',
        loadChildren: () =>
          import('../clienti/clienti.module').then((m) => m.ClientiModule),
      },
      {
        path: 'form-cliente/:id',
        loadChildren: () =>
          import('../form-cliente/form-cliente.module').then((m) => m.FormClienteModule),
      },
      {
        path: 'fatture',
        loadChildren: () =>
          import('../fatture/fatture.module').then((m) => m.FattureModule),
      },
      {
        path: 'form-fattura/:id',
        loadChildren: () =>
          import('../form-fattura/form-fattura.module').then((m) => m.FormFatturaModule),
      },
      {
        path: 'fatture/cliente/:id',
        loadChildren: () =>
          import('../fatture/fatture.module').then((m) => m.FattureModule),
      },
      {
        path: 'nuova-fattura/:id',
        loadChildren: () =>
          import('../nuova-fattura/nuova-fattura.module').then((m) => m.NuovaFatturaModule),
      },
    ],
  },
];

@NgModule({
  declarations: [DashboardComponent, NavbarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,


  ],
  exports: [RouterModule]
})
export class DashboardModule { }
