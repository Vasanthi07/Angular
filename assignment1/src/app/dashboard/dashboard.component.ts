import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app.state';
import { Details } from '../details';
import { deletePost } from '../state/post.actions';
import { getPosts } from '../state/post.selector';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  colTable : string[] = ['id','firstName','lastName','email','mobile','street','city','state','pincode','date','edit','delete']
  dsColTable : MatTableDataSource<Details>;
  
  details:Array<Details>

  // @Input ('search') search : string = "";
  searchText;
  searchText1;
  searchTextto;

  posts : Observable<Details[]>;

  constructor(private httpClient:HttpClient, private store : Store<AppState>) { 
    this.dsColTable = new MatTableDataSource<Details>();

  }

  disp : boolean = false
  ngOnInit(): void {


  //  this.httpClient.get<Array<Details>>("http://localhost:3000/details").subscribe(
  //     (data)=>{
  //       this.details = data
  //       if(this.details.length>0){
          
  //       }
        
  //       console.log(this.details)
  //       console.log(data)
  //     }
  //   )

   this.posts = this.store.select(getPosts);

  }
  
  posts1:any
  selectedUsers:any
  showAll(){
    this.disp=true
    this.selectedUsers = this.posts.subscribe((data)=>
    {
      this.posts1 = data
      console.log(data)
      console.log(this.posts1)
    })
    this.selectedUsers = this.posts1
    console.log(this.selectedUsers)
    this.dsColTable.data = this.selectedUsers
  }
  
  search(){
    this.ngOnInit()
    let startDate;
    let endDate;
    this.disp=true
    console.log(this.searchText)
    console.log(this.searchTextto)
    startDate = new Date(this.searchText).toLocaleString()
    endDate=new Date(this.searchTextto).toLocaleString()
    console.log(startDate)
    console.log(endDate)
    this.selectedUsers = this.posts.subscribe((data)=>{
      this.posts1 = data
    })
    this.selectedUsers = this.posts1.filter(f => f.date > startDate && f.date < endDate);
    console.log(this.selectedUsers)
    console.log(this.selectedUsers[0].id)
    this.dsColTable.data = this.selectedUsers
   
  }

  deletePost(id:number){
    if(confirm("Are you sure you want to delete")){
      // console.log("delete the post")
      this.store.dispatch(deletePost({id}));
      this.showAll()
    }
  }
  
}
