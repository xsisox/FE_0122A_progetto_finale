import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientiComponent } from './clienti.component';
import  {RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

const routes: Routes = [{ path: '', component: ClientiComponent }];

@NgModule({
  declarations: [ClientiComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class ClientiModule { }
