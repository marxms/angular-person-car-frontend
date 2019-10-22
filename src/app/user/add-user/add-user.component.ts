import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../../service/api.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService) {
    
   }

  addForm: FormGroup;


  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      login: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      birthday: ['', Validators.required],
      phone: ['', Validators.required],
      cars: this.formBuilder.array([])
    });

  }

  onSubmit() {
    this.apiService.createUser(this.addForm.value)
      .subscribe( data => {
        this.router.navigate(['list-user']);
      });
  }

  addCars() {
    const cars = this.addForm.controls.cars as FormArray;
    cars.push(this.formBuilder.group({
  	year: '',
	  licensePlate: '',
    model: '',
    color: ''
    }));
  }
  cmpare(index) {
    return index;
  }

}
