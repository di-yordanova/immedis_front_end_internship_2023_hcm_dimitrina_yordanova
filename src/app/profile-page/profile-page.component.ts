import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

interface PersonalInfoField {
  label: string;
  value: string;
  isEditing: boolean;
}

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {
  isProfileActive: boolean = true;
  isPersonalActive: boolean = false;
  isDepartmentActive: boolean = false;
  isSalaryActive: boolean = false;
  isEditing: boolean = false;
  isDashboardActive: boolean = false;

  username: string = "Admin";
  editedUsername: string = '';
  fullNameControl: FormControl = new FormControl("Initial Full Name");

  personalInfoControl: FormControl = new FormControl("");
  departmentControl: FormControl = new FormControl("");
  salaryControl: FormControl = new FormControl("");

  personalInfoFields: PersonalInfoField[] = [
    { label: "Full name", value: "John Doe", isEditing: false },
    { label: "Phone number", value: "123-456-7890", isEditing: false },
    { label: "Email address", value: "johndoe@example.com", isEditing: false }
  ];

  editFieldData(field: PersonalInfoField) {
    field.isEditing = true;
  }

  saveFieldData(field: PersonalInfoField) {
    field.isEditing = false;
  }

  deleteFieldData(field: PersonalInfoField) {

  }

  editUsername() {
    this.isEditing = true;
    this.editedUsername = this.username;
  }

  saveUsername() {
    this.isEditing = false; 
    this.username = this.editedUsername;
  }

  editPersonalInfo() {
  }

  savePersonalInfo() {
  }

  activateProfile() {
    this.isProfileActive = true;
    this.isPersonalActive = false;
    this.isDepartmentActive = false;
    this.isSalaryActive = false;
  }

  activatePersonal() {
    this.isProfileActive = false;
    this.isPersonalActive = true;
    this.isDepartmentActive = false;
    this.isSalaryActive = false;
  }


  activateSalary() {
    this.isProfileActive = false;
    this.isPersonalActive = false;
    this.isDepartmentActive = false;
    this.isSalaryActive = true;
  }
  activateDashboard() {
    this.isProfileActive = false;
    this.isDashboardActive = true;
    this.isDepartmentActive = false;
    this.isSalaryActive = false;
  }

  activateDepartment() {
    this.isProfileActive = false;
    this.isDashboardActive = false;
    this.isDepartmentActive = true;
    this.isSalaryActive = false;
  }

  logout() {
  }
}