import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Details } from '../details';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  colTable : string[] = ['id','firstName','lastName','email','mobile','street','city','state','pincode','date','edit']
  dsColTable : MatTableDataSource<Details>;
  
  details:Array<Details>

  // @Input ('search') search : string = "";
  searchText;
  searchText1;
  searchTextto;

  constructor(private httpClient:HttpClient) { 
    this.dsColTable = new MatTableDataSource<Details>();

  }

  disp : boolean = false
  ngOnInit(): void {
   this.httpClient.get<Array<Details>>("http://localhost:3000/details").subscribe(
      (data)=>{
        this.details = data
        if(this.details.length>0){
          
        }
        
        console.log(this.details)
        console.log(data)
      }
    )

  }
  
  selectedUsers:any
  search(){
    this.ngOnInit()
    let startDate;
    let endDate;
    this.disp=true
    console.log(this.searchText)
    console.log(this.searchTextto)
    startDate = this.searchText
    endDate=this.searchTextto
    console.log(startDate)
    console.log(endDate)
    this.selectedUsers = this.details.filter(f => f.date > startDate && f.date < endDate);
    console.log(this.selectedUsers)
    console.log(this.selectedUsers[0].id)
    this.dsColTable.data = this.selectedUsers
   
  }
  
}
