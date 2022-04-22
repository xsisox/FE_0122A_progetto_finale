import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {}
  user = {username: "", password:"", email: "", role: [""]};

  async signup(form: NgForm) {

    this.user.username = form.value.username;
    this.user.password = form.value.password;
    this.user.email = form.value.email;
    this.user.role.splice(0,1);
    this.user.role.push(form.value.roles);

    console.log(this.user);
    try {
      await this.authSrv.register(this.user).toPromise();
      this.router.navigate(['/login']);
    } catch (error) {
      alert('error');
    }
  }
}
