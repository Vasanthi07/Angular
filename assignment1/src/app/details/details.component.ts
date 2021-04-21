import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Details } from '../details';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app.state';
import { addPost, updatePost } from '../state/post.actions';
import { getPostById } from '../state/post.selector';
import { DashboardComponent } from '../dashboard/dashboard.component';



@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  
  // id:any
  registerForm: FormGroup;
    submitted = false;
    details: Details
  usersJson: any[];
  states = [ "Andhra Pradesh",
                "Arunachal Pradesh",
                "Assam",
                "Bihar",
                "Chhattisgarh",
                "Goa",
                "Gujarat",
                "Haryana",
                "Himachal Pradesh",
                "Jammu and Kashmir",
                "Jharkhand",
                "Karnataka",
                "Kerala",
                "Madhya Pradesh",
                "Maharashtra",
                "Manipur",
                "Meghalaya",
                "Mizoram",
                "Nagaland",
                "Odisha",
                "Punjab",
                "Rajasthan",
                "Sikkim",
                "Tamil Nadu",
                "Telangana",
                "Tripura",
                "Uttarakhand",
                "Uttar Pradesh",
                "West Bengal",
                "Andaman and Nicobar Islands",
                "Chandigarh",
                "Dadra and Nagar Haveli",
                "Daman and Diu",
                "Delhi",
                "Lakshadweep",
                "Puducherry"]

  constructor(private formBuilder: FormBuilder,private httpClient:HttpClient,private route:ActivatedRoute,private router:Router,private store:Store<AppState>) { }

  post: Details;
  id2 :any
  isAddMode:any
  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{

      const id = params.get('id');
      this.id2 = params.get('id')
      console.log(id);
      this.store.select(getPostById,{id}).subscribe(data=>{
        this.post = data
        console.log(this.post)
        console.log(data)
      })
    });

    this.isAddMode = !this.id2;

    this.date = new Date()

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile:['',[Validators.required,Validators.pattern("[0-9]{10}")]],
      street:['',[Validators.required]],
      city:['',[Validators.required,Validators.pattern("[a-zA-z]*")]],
      state:['',[Validators.required]],
      pincode:['',[Validators.required,Validators.pattern("[0-9]{6}")]],
      // date:['']
  });

  if(!this.isAddMode){
    this.registerForm.patchValue(this.post)
      this.details = this.post;
      
  }
  }

  get f() { return this.registerForm.controls; }

  formValue:any

  existingData:any = []

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
        return;
    }

    if(this.isAddMode){
      this.createUser()
    }

    else{
     this.updateUser()
    }

        
}


format1: string = "";
date: Date;

createUser() {
  alert('thanks for Sign Up'+ new Date().toLocaleString())
    // console.log("hello")
    // let data = this.registerForm.value
    // console.log(data)
    // console.log("hi")
    // // let now = moment().format("DD-MM-YYYY HH:mm");
    // // this.format1 = now;
    // data["date"] = new Date()
    // console.log(data)
    // this.httpClient.post<Details>("http://localhost:3000/details",data).subscribe(
    //   (data)=>{
    //     this.details=data
    //     console.log(data)
    //     console.log(this.details)
    //   }
    // )


    // using store
    const post : Details ={
      firstName:this.registerForm.value.firstName,
      lastName:this.registerForm.value.lastName,
      email:this.registerForm.value.email,
      mobile:this.registerForm.value.mobile,
      street:this.registerForm.value.street,
      city:this.registerForm.value.city,
      state:this.registerForm.value.state,
      pincode:this.registerForm.value.pincode,
      date:this.registerForm.value.date
      
    };

    post['date'] = new Date().toLocaleString()
    
    console.log(post)
    this.store.dispatch(addPost({post}));
    

    
    this.router.navigate(['/dashboard'])

    
    
}
updateUser() {
  // let data = this.registerForm.value
  // console.log(data)
  // console.log("hi")
  // data["date"] = new Date()
  // console.log(data) 
  // this.httpClient.put<Details>("http://localhost:3000/details/"+this.id,data).subscribe(
  //   (response)=>{
  //     this.details = response
  //     console.log(this.details)
  //     console.log(response)
  //   }
  // )
  const firstName = this.registerForm.value.firstName;
  const lastName = this.registerForm.value.lastName;
  const email = this.registerForm.value.email;
  const mobile = this.registerForm.value.mobile;
  const street = this.registerForm.value.street;
  const city = this.registerForm.value.city;
  const state = this.registerForm.value.state;
  const pincode = this.registerForm.value.pincode;
  const date = new Date().toLocaleString()

  const post: Details={
    id:this.post.id,
    firstName,lastName,email,mobile,street,city,state,pincode,date
  };

  this.store.dispatch(updatePost({post}));
  
  this.router.navigate(['/dashboard'])

}
}

