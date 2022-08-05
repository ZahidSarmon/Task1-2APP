import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  readonly BaseURI = environment.apiUrl+'Account/';

  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    FullName: [''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })

  });

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl?.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password')?.value != confirmPswrdCtrl?.value)
        confirmPswrdCtrl?.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl?.setErrors(null);
    }
  }

  register(data:any) {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
    };
    console.log(body);
    return this.http.post(this.BaseURI + 'Register', body);
  }

  login(formData:any) {
    return this.http.post(this.BaseURI + 'Login', formData);
  }

  getUserProfile() {
    return this.http.get(this.BaseURI + 'GetUserProfile');
  }

  SaveOrEditCompany(model: any) {
    return this.http.post(this.BaseURI + 'SaveOrEditCompany', model);
  }
  DeleteCompany(id:any) {
    return this.http.get(this.BaseURI + 'DeleteCompany?id='+id);
  }
  GetCompany(id:any) {
    return this.http.get(this.BaseURI + 'GetCompany?id='+id);
  }
  GetAllCompany() {
    return this.http.get(this.BaseURI + 'GetAllCompany');
  }

  SaveOrEditClient(model: any) {
    return this.http.post(this.BaseURI + 'SaveOrEditClient', model);
  }
  DeleteClient(id:any) {
    return this.http.get(this.BaseURI + 'DeleteClient?id='+id);
  }
  GetClient(id:any) {
    return this.http.get(this.BaseURI + 'GetClient?id='+id);
  }
  GetAllClient() {
    return this.http.get(this.BaseURI + 'GetAllClient');
  }
  GetAllConfigure() {
    return this.http.get(this.BaseURI + 'GetAllConfigure');
  }

}