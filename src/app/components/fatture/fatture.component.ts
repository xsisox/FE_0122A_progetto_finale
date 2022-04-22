import { Component, OnInit } from '@angular/core';
import { ComponentsService } from '../components.service';
import { PageEvent } from '@angular/material/paginator';
import { tap, map } from 'rxjs/operators';
import { InvoiceData } from '../components.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-fatture',
  templateUrl: './fatture.component.html',
  styleUrls: ['./fatture.component.scss']
})
export class FattureComponent implements OnInit {


  dataSource: InvoiceData | any = null;
  pageEvent!: PageEvent;

  displayedColumns: string[] = ['id', 'fatturaNumero', 'data', 'importo', 'ragioneSociale', 'telefonoContatto', 'stato', 'gestioneFattura' ];

  idCliente!: number;
  labelRagioneSociale!: string;

  constructor(private componentsSrv: ComponentsService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idCliente =+params['id']
      console.log(this.idCliente)
    });
    this.initdataSource();

  }

  initdataSource(){
    if(this.idCliente){
      this.componentsSrv.getInvoicesByCliente(this.idCliente, 0, 10).pipe(
        map((invoiceData: InvoiceData) => {
          this.dataSource = invoiceData
          var cliente = this.dataSource.content[0].cliente;
          this.labelRagioneSociale = cliente.ragioneSociale})).subscribe();
    }else{
    this.componentsSrv.getInvoices(0, 20).pipe(
      tap((invoiceData: InvoiceData) => console.log(invoiceData)),
      map((invoiceData: InvoiceData) => {this.dataSource = invoiceData})).subscribe();
    }
  }

  onPaginateChange(event: PageEvent){
    let page = event.pageIndex;
    let size = event.pageSize;

    page = page + 0;

    if(this.idCliente){
      this.componentsSrv.getInvoicesByCliente(this.idCliente, page, size).pipe(
        map((invoiceData: InvoiceData) => {this.dataSource = invoiceData})).subscribe();
    }else{
    this.componentsSrv.getInvoices(page, size).pipe(
      map((invoiceData: InvoiceData) => {this.dataSource = invoiceData})).subscribe();
    }

  }

  cancellaFattura(idFattura:number){
    this.componentsSrv.cancellaFattura(idFattura).subscribe(canc =>{
      location.reload();
      console.log("Hai cancellato la fattura con id", idFattura)
    })
  }

  //filtraImporto(){}
}
