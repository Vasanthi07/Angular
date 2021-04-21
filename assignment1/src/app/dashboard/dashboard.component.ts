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

  colTable: string[] = ['id', 'firstName', 'lastName', 'email', 'mobile', 'street', 'city', 'state', 'pincode', 'date', 'edit', 'delete']
  dsColTable: MatTableDataSource<Details>;

  details: Array<Details>

  // @Input ('search') search : string = "";
  searchText;
  searchText1;
  searchTextto;

  posts: Observable<Details[]>;

  constructor(private httpClient: HttpClient, private store: Store<AppState>) {
    this.dsColTable = new MatTableDataSource<Details>();

  }

  disp: boolean = false
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

    // this.showAll()

  }

  posts1: any
  selectedUsers: any
  showAll() {
    this.disp = !this.disp
    this.selectedUsers = this.posts.subscribe((data) => {
      this.posts1 = data
      console.log(data)
      console.log(this.posts1)
    })
    this.selectedUsers = this.posts1
    console.log(this.selectedUsers)
    this.dsColTable.data = this.selectedUsers
  }

  search() {

    let startDate;
    let endDate;
    let d1 = Date.parse(this.searchText);
    let d2 = Date.parse(this.searchTextto);
    console.log(d1)
    console.log(d2)
    if (d1 > d2) {
      alert("start date should be less than end date");
    }
    else {
      this.disp = true
      console.log(this.searchText)
      console.log(this.searchTextto)

      this.selectedUsers = this.posts.subscribe((data) => {
        this.posts1 = data
      })
      this.selectedUsers = this.posts1.filter(f => Date.parse(f.date) > d1 && Date.parse(f.date) < d2);
      if (this.selectedUsers == null) {
        // console.log("hi")
        this.selectedUsers = []
      }
      console.log(this.selectedUsers)
      this.dsColTable.data = this.selectedUsers

    }
  }

  deletePost(id: number) {
    if (confirm("Are you sure you want to delete")) {
      // console.log("delete the post")
      this.store.dispatch(deletePost({ id }));
      this.showAll()
    }
  }

}
