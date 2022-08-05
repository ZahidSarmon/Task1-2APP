import { UserService } from './../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfiguredListComponent } from './configured-list/configured-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  userDetails:any;
  isCompany:boolean=true;
  isClient:boolean=true;
  isConfigure:boolean=true;
  constructor(private router: Router, private service: UserService) { }

  ngOnInit() {
    
  }


  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }
  clickOptions(name:string)
  {
    this.trueFalse(true);
    if(name.indexOf("company")>-1)
    {
      this.isCompany=false;
    }else if(name.indexOf("client")>-1)
    {
      this.isClient=false;
    }else if(name.indexOf("configure")>-1)
    {
      this.isConfigure=false;
    }
  }
  trueFalse(b:boolean)
  {
    this.isCompany=b;
    this.isClient=b;
    this.isConfigure=b;
  }
}
