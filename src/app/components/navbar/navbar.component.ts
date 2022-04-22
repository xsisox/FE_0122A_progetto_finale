import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { BreakpointObserver } from '@angular/cdk/layout';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user$ = this.authSrv.user$

  isExpanded:boolean = false; //espandere toolbar

  fixedInViewPort:boolean = true; //fixed toolbar in alto

  constructor(private authSrv: AuthService, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
  }

  logout(){
    this.authSrv.logout();
  }
}
