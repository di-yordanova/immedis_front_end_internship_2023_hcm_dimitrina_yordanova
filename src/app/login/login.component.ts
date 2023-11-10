import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/@/)]],
      password: ['', Validators.required],
      errorMessageUsername: [''],
      errorMessagePassword: ['']
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Username:', this.loginForm.get('username')!.value);
      console.log('Password:', this.loginForm.get('password')!.value);
      if (this.isValidUser()) {
        this.router.navigate(['/profile-page']);
      } else {
        const enteredUsername = this.loginForm.get('username')!.value;
        const enteredPassword = this.loginForm.get('password')!.value;
  
        if (enteredUsername !== 'admin@example.com') {
          this.loginForm.get('errorMessageUsername')!.setValue('Invalid username');
        } else {
          this.loginForm.get('errorMessageUsername')!.setValue('');
        }
  
        if (enteredPassword !== 'password123') {
          this.loginForm.get('errorMessagePassword')!.setValue('Invalid password');
        } else {
          this.loginForm.get('errorMessagePassword')!.setValue('');
        }
      }
    } else {
      console.log('Invalid form data!');
    }
  }
  
  private isValidUser(): boolean {
    const validUsername = 'admin@example.com';
    const validPassword = 'password123';

    const enteredUsername = this.loginForm.get('username')!.value;
    const enteredPassword = this.loginForm.get('password')!.value;

    if (enteredUsername === validUsername && enteredPassword === validPassword) {
      return true;
    } else {
      return false;
    }
  }
}