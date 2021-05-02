import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  errorMessage;
  isLoggedIn = false;
  
  constructor(
    public userService: UserService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.form = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', Validators.required),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required)
    });

    this.isLoggedIn = !!window.sessionStorage.getItem('auth-token');
    if (this.isLoggedIn) {
      this.router.navigateByUrl('courses');
    }
  }
   
  get f(){
    return this.form.controls;
  }
    
  submit(){
    // console.log(this.form.value);
    this.userService.signup(this.form.value).subscribe(res => {
        //  console.log('Signup successfully!');
         this.router.navigateByUrl('login');
    }, err => {
      this.errorMessage = err;
    })
  }

}
