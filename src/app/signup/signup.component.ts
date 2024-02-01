import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  public signupForm !: FormGroup;

  constructor(private _fb: FormBuilder, private _http: HttpClient, private _router: Router) {}

  ngOnInit(): void {
      this.signupForm = this._fb.group({
        fullName: ['', Validators.required],
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.required],
        mobile: ['', Validators.required]
      })
  }

  signUp() {
    this._http.post<any>("http://localhost:3000/signupUsers", this.signupForm.value)
    .subscribe( res => {
      alert("User register successfully");
      this.signupForm.reset();
      this._router.navigate(['login']);
    },
    err => {
      alert("Something went wrong");
    })
  }

}
