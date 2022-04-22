import { Component, OnInit } from '@angular/core';
import { ComponentsService } from '../components.service';
import { CustomerData } from '../components.service';
import { PageEvent } from '@angular/material/paginator';
import { tap, map} from 'rxjs/operators';

@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.scss']
})
export class ClientiComponent implements OnInit {

  dataSource: CustomerData | any = null;
  pageEvent!: PageEvent;

  displayedColumns: string[] = ['id', 'partitaIva', 'pec', 'telefono', 'nomeEcognome', 'telefonoContatto', 'ragioneSociale', 'gestioneCliente' ];


  constructor(private componentSrv: ComponentsService) { }

  ngOnInit(): void {
    this.initdataSource();
  }
  initdataSource(){
    this.componentSrv.getCustomers(0, 10).pipe(
      tap((customerData: CustomerData) => console.log(customerData)),
      map((customerData: CustomerData) => {this.dataSource = customerData})).subscribe();
  }

  onPaginateChange(event: PageEvent){
    let page = event.pageIndex;
    let size = event.pageSize;

    page = page + 0;

  this.componentSrv.getCustomers(page, size).pipe(map((customerData: CustomerData) => {this.dataSource = customerData})).subscribe();
  }


  cancellaCliente(idCliente: number){
    this.componentSrv.cancellaCliente(idCliente).subscribe(canc =>{
      location.reload();
      console.log("Hai cancellato il cliente con id", idCliente)
    })
  }

}
