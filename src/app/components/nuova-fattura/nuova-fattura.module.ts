import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuovaFatturaComponent } from './nuova-fattura.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: NuovaFatturaComponent }];

@NgModule({
  declarations: [NuovaFatturaComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class NuovaFatturaModule { }
