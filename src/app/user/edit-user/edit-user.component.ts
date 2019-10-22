import { Component, OnInit , Inject} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators, FormArray} from "@angular/forms";
import {first} from "rxjs/operators";
import {User} from "../../model/user.model";
import {ApiService} from "../../service/api.service";
import { DatePipe } from '@angular/common';
import { Car } from 'src/app/model/car.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  providers:[DatePipe]
})
export class EditUserComponent implements OnInit {

  user: User;
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService, private datePipe: DatePipe) { }

  ngOnInit() {
    let userId = window.localStorage.getItem("editUserId");
    if(!userId) {
      alert("Invalid action.")
      this.router.navigate(['list-user']);
      return;
    }
    this.editForm = this.formBuilder.group({
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
    this.apiService.getUserById(+userId)
      .subscribe( data => {
        data.birthday = new Date(this.datePipe.transform(data.birthday, 'yyyy-MM-dd'))
        this.editForm.patchValue(
          {
            id: data.id,
            login: data.login,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            birthday: this.datePipe.transform(data.birthday, 'yyyy-MM-dd'),
            phone: data.phone
            
          }
        );
        this.loadCars(data.cars)
      });
  }

  onSubmit() {
    this.apiService.updateUser(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          if(data.status === 200) {
            alert('User updated successfully.');
            this.router.navigate(['list-user']);
          }else {
            alert(data.message);
          }
        },
        error => {
          alert(error);
        });
  }

    addCars() {
    const cars = this.editForm.controls.cars as FormArray;
    cars.push(this.formBuilder.group({
  	year: '',
	  licensePlate: '',
    model: '',
    color: ''
    }));
  }

  loadCars(cars) {

    const carros = cars as Array<Car>
    const carsForm = this.editForm.controls.cars as FormArray
    carros.forEach(car => {
      carsForm.push(this.formBuilder.group({
        year: car.year,
        licensePlate: car.licensePlate,
        model: car.model,
        color: car.color
        }));
    });
  }
  cmpare(index) {
    return index;
  }
  formatDate(iDate: Date) {
    var inputDate = new Date(iDate);
    var formattedDate = inputDate.getFullYear()+'-'+(inputDate.getMonth() + 1)+'-'+ 
    inputDate.getDate();
    return formattedDate;
 }
}
