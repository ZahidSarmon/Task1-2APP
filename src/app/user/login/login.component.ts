import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  formModel = {
    UserName: '',
    Password: ''
  }
  isLoad:boolean=false;
  constructor(private service: UserService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/home');
  }

  onSubmit(form: NgForm) {
    if(form.valid)
    {
      this.isLoad=true;
      this.service.login(form.value).subscribe(
        (res: any) => {
          this.isLoad=false;
          localStorage.setItem('token', res.token);
          this.router.navigateByUrl('/home');
        },
        err => {
          if (err.status == 400)
          {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Oops...',
              text: 'Incorrect username or password.'
            })
          }
          else
            console.log(err);
          this.isLoad=false;
        }
      );
    }
  }
}