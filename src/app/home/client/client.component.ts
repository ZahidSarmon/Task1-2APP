import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators,FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/shared/user.service';
declare var $:any;
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  fmgClient:FormGroup|any;
  ClientList:any[]=[];
  isSelect:boolean=false;
  isLoad:boolean=true;
  isSave:boolean=false;
  constructor(private fb: FormBuilder,private authService:UserService) { }

  ngOnInit(): void {
    this.Init();
    this.GetAllData();
  }
  Init() {
    this.isSelect=false;
    this.fmgClient = this.fb.group({
      Name: ['', Validators.required]
    });
  }
  ShowModal()
  {
    this.Init();
    $("#clientModal").modal('show');
  }
  GetAllData()
  {
    this.isLoad=true;
    this.ClientList=[];
    try{
      this.authService.GetAllClient().subscribe((data: any)=>{
        console.log("Get All Data::");
        for(let item of data)
        {
          this.ClientList.push(item);
        }
        this.isLoad=false;
        console.log(this.ClientList);
      },(err: any)=>{
        console.log(err);
      });
    }catch(exp){

    }
  }
  Edit(id:string)
  {
    this.isSelect=false;
    try{
      let data=this.ClientList.find(x=>x.id==id);
      if(data!=undefined)
      {
        this.fmgClient = this.fb.group({
          ID: [data.id, Validators.nullValidator],
          Name: [data.name, Validators.required]
        });
        $("#clientModal").modal('show');
      }
    }catch(exp){

    }
  }
  Select(id:string)
  {
    this.isSelect=true;
    try{
      let data=this.ClientList.find(x=>x.id==id);
      if(data!=undefined)
      {
        this.fmgClient = this.fb.group({
          ID: [data.id, Validators.nullValidator],
          Name: [data.name, Validators.required]
        });
        this.isSelect=true;
        $("#clientModal").modal('show');
      }
    }catch(exp){

    }
  }
  Delete(id:string)
  {
    try{
      if(id!="")
      {
        Swal.fire({
          title: 'Are you sure?',
          text: "Do you want to delete this data?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.authService.DeleteClient(id).subscribe(data=>{
              if(data)
              {
                Swal.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                )
                this.GetAllData();
              }
            });
          }
        })
      }
    }catch(exp){
      
    }
  }
  AddOrEdit()
  {
    this.isSave=true;
    if(this.fmgClient.valid)
    {
      this.authService.SaveOrEditClient(Object.assign({},this.fmgClient.value)).subscribe(data=>{
        console.log("Data Success::");
        console.log(data);
        if(data)
        {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved or updated',
            showConfirmButton: false,
            timer: 1500
          })
          this.isSave=false;
          $("#clientModal").modal('hide');
          this.GetAllData();
        }
      },err=>{
        console.log(err);
      });
    }
  }

}
