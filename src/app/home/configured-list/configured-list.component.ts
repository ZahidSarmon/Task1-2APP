import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-configured-list',
  templateUrl: './configured-list.component.html',
  styleUrls: ['./configured-list.component.css']
})
export class ConfiguredListComponent implements OnInit {
  configureList:any[]=[];
  constructor(private authService:UserService) { }

  ngOnInit(): void {
    this.GetAllData();
  }
  GetAllData()
  {
    this.configureList=[];
    try{
      this.authService.GetAllConfigure().subscribe((data: any)=>{
        console.log("Get All Data::");
        for(let item of data)
        {
          this.configureList.push(item);
        }
        console.log(this.configureList);
      },(err: any)=>{
        console.log(err);
      });
    }catch(exp){

    }
  }
}
