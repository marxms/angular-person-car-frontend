import { Car } from './car.model'

export class User {

  id : number
	
	firstName : string
	
	lastName : string
	
	email : string
	
	birthday : Date
	
	login : string
	
	password : string
	
	phone : string
	
	cars : Array<Car>

	createdAt : Date
	
	lastLogin : Date;

}
