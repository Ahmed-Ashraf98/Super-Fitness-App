import { Validators } from "@angular/forms";
export const validsignup ={
name:[Validators.required,Validators.minLength(2),Validators.maxLength(20)],
Password:[Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)],
email:[Validators.email,Validators.required],
phone:[Validators.required,Validators.maxLength(11),Validators.minLength(11)],
street: [Validators.required, Validators.minLength(5)],
city: [Validators.required, Validators.minLength(2)],
zipCode: [Validators.required, Validators.pattern(/^\d{4}$/)],
state: [Validators.required, Validators.minLength(2)],
}
