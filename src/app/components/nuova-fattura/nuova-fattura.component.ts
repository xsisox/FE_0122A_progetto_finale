import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentsService } from '../components.service';

import { Fattura } from 'src/app/models/fattura';
import { Stato } from 'src/app/models/stato';


@Component({
  selector: 'app-nuova-fattura',
  templateUrl: './nuova-fattura.component.html',
  styleUrls: ['./nuova-fattura.component.scss']
})
export class NuovaFatturaComponent implements OnInit {

  id!:number ;
    idCliente!:number ;
    form!: FormGroup;
    fattura!: Fattura ;
    statoFattura!: Stato[];

  constructor(
    private fb: FormBuilder,
    private componentSrv: ComponentsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {};




	ngOnInit(): void {
		console.log('ngOnInit');
		this.route.params.subscribe(params => {
			this.idCliente = +params['id'];

			console.log(this.idCliente);
			this.InizializzaForm();
			this.Carica();
      this.CaricaStatoFatture();
		});

	}

  cSalva(DatiForm: { value: { data: string; numero: number; anno: number; importo: number; stato: any; }; }) {

		console.log(DatiForm.value);

    this.id = 0;
			this.fattura = { id: 0, numero: 0, anno: 0, data: '', importo: 0, stato: { id: 0, nome: '' }, cliente: {} };


		this.fattura.id = this.id;
		this.fattura.data = DatiForm.value.data;
		this.fattura.numero = DatiForm.value.numero;
		this.fattura.anno = DatiForm.value.anno;
		this.fattura.importo = DatiForm.value.importo;
		this.fattura.stato.id = DatiForm.value.stato;
		if (this.idCliente) { this.fattura.cliente.id = this.idCliente; }

		this.componentSrv.Save( this.id, this.fattura).subscribe(res => {
			console.log(res);
			this.router.navigate(['/fatture']);
		});
	}

	InizializzaForm() {
		console.log('InizializzaForm');
		this.form = this.fb.group({
			data: new FormControl('', [Validators.required]),
			numero: new FormControl('', [Validators.required]),
			anno: new FormControl('', [Validators.required]),
			importo: new FormControl('', [Validators.required]),
			stato: new FormControl('', [Validators.required]),
		});
	}

	Carica() {
		if (this.id !== 0) {
			this.componentSrv.getFatturaById(this.id).subscribe(
				data => {
					console.log(data);
					this.fattura = data;
					this.fattura.data = this.fattura.data.substr(0, 10);
					this.form.patchValue({
						data: this.fattura.data,
						numero: this.fattura.numero,
						anno: this.fattura.anno,
						importo: this.fattura.importo,
            stato: this.fattura.stato.id,

					})
				}
			);
		}
	}

	CaricaStatoFatture() {
		this.componentSrv.getStatiFatturaAll(0).subscribe(
			data => {
				this.statoFattura = data.content;
			}
		);
	}



}
