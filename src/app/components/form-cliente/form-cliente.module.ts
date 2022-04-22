import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormClienteComponent } from './form-cliente.component';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


//const routes: Routes = [{ path: '', component: FormClienteComponent }];

@NgModule({
  declarations: [FormClienteComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: FormClienteComponent }]),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FormClienteModule { }
