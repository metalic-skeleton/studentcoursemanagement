import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  errorMessage;
  isLoggedIn = false;

  constructor(
    public userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required)
    });

    this.isLoggedIn = !!window.sessionStorage.getItem('auth-token');
    if (this.isLoggedIn) {
      this.router.navigateByUrl('courses');
    }
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    // console.log(this.form.value);
    this.userService.login(this.form.value).subscribe(res => {
      //  console.log('Login successfully!', res);
      window.sessionStorage.setItem('auth-token', res.token);
      window.location.reload();
    }, err => {
      this.errorMessage = 'Invalid Login Credentials';
    })
  }

}
