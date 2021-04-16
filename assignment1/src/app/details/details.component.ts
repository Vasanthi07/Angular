import { HttpClient } from '@angular/common/http';
import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Details } from '../details';
import { Moment } from 'moment';
import * as moment from 'moment';



@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  
  id:any
  registerForm: FormGroup;
    submitted = false;
    details: Details
  usersJson: any[];
  constructor(private formBuilder: FormBuilder,private httpClient:HttpClient,private route:ActivatedRoute,private router:Router) { }

  isAddMode:any
  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.id = params.get('id');
      console.log(this.id);
    });

    this.isAddMode = !this.id;

    this.date = new Date()

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile:['',[Validators.required,Validators.pattern("[0-9]{10}")]],
      street:['',[Validators.required]],
      city:['',[Validators.required,Validators.pattern("[a-zA-z]*")]],
      state:['',[Validators.required,Validators.pattern("[a-zA-z]*")]],
      pincode:['',[Validators.required,Validators.pattern("[0-9]{6}")]],
      // date:['']
  });

  if(!this.isAddMode){
    this.httpClient.get<Details>("http://localhost:3000/details/"+this.id).subscribe(
      (data)=> {this.registerForm.patchValue(data)
      this.details = data
      }
    )
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
    console.log("hello")
    let data = this.registerForm.value
    console.log(data)
    console.log("hi")
    // let now = moment().format("DD-MM-YYYY HH:mm");
    // this.format1 = now;
    data["date"] = new Date()
    console.log(data)
    this.httpClient.post<Details>("http://localhost:3000/details",data).subscribe(
      (data)=>{
        this.details=data
        console.log(data)
        console.log(this.details)
      }
    )

    this.router.navigate(['/dashboard'])

    
    
}
updateUser() {
  let data = this.registerForm.value
  console.log(data)
  console.log("hi")
  data["date"] = new Date()
  console.log(data) 
  this.httpClient.put<Details>("http://localhost:3000/details/"+this.id,data).subscribe(
    (response)=>{
      this.details = response
      console.log(this.details)
      console.log(response)
    }
  )
  this.router.navigate(['/dashboard'])

}
}

