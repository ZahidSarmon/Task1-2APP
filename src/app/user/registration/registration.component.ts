import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
declare var $:any;
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService) { }

  ngOnInit() {
    this.service.formModel.reset();
  }

  onSubmit() {
    if(this.service.formModel.valid)
    {
      this.service.register(this.service.formModel.value).subscribe(
        (res: any) => {
          if (res.succeeded) {
            this.service.formModel.reset();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'New user created!',
              showConfirmButton: false,
              timer: 1500
            })
          } else {
            res.errors.forEach((element: { code: any; description: any; }) => {
              switch (element.code) {
                case 'DuplicateUserName':
                  Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Username is already taken'
                  })
                  break;
                default:
                  Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Oops...',
                    text: ''+element.description
                  })
                  break;
              }
            });
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  }

}
