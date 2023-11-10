import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface PersonalInfoField {
  label: string;
  value: string;
  isEditing: boolean;
  editedValue?: string;
  options?: string[];
  showDropdown?: boolean;
}

interface DepartmentField {
  label: string;
  value: string;
  isEditing: boolean;
  editedValue?: string;
  options?: string[];
  showDropdown?: boolean;
}

interface SalaryField {
  label: string;
  value: string;
  isEditing: boolean;
  editedValue?: string;
  options?: string[];
  showDropdown?: boolean;
}

interface NewField {
  label: string;
  value: string;
}

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  isProfileActive: boolean = true;
  isPersonalActive: boolean = false;
  isDepartmentActive: boolean = false;
  isSalaryActive: boolean = false;
  isEditing: boolean = false;
  isDashboardActive: boolean = false;
  isPersonalInfoActive: boolean = false;
  isDepartmentInfoActive: boolean = false;
  isSalaryInfoActive: boolean = false;
  isSaving: boolean = false;
  isDropdownOpen: boolean = false;
  isAddingNewField: boolean = false;
  newFieldLabel: string = '';

  userAvatarUrl: string | ArrayBuffer | null = null;
  isHovered: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
    const storedPersonalInfoFields = localStorage.getItem('personalInfoFields');
    const storedDepartmentFields = localStorage.getItem('departmentFields');
    const storedSalaryFields = localStorage.getItem('salaryFields');

    if (storedPersonalInfoFields) {
      this.personalInfoFields = JSON.parse(storedPersonalInfoFields);
    }

    if (storedDepartmentFields) {
      this.departmentFields = JSON.parse(storedDepartmentFields);
    }

    if (storedSalaryFields) {
      this.salaryFields = JSON.parse(storedSalaryFields);
    }

    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.username = storedUsername;
    }

  }

  ngOnInit(): void {
    const storedUserAvatarUrl = localStorage.getItem('userAvatarUrl');
    const storedPersonalInfoFields = localStorage.getItem('personalInfoFields');
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.username = storedUsername;
    }

    if (storedUserAvatarUrl) {
      this.userAvatarUrl = storedUserAvatarUrl;
    }
    if (storedPersonalInfoFields) {
      this.personalInfoFields = JSON.parse(storedPersonalInfoFields);
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (ctx) {
            const canvasSize = 110;
            canvas.width = canvasSize;
            canvas.height = canvasSize;

            ctx.beginPath();
            ctx.arc(canvasSize / 2, canvasSize / 2, canvasSize / 2, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.clip();

            ctx.drawImage(img, 0, 0, canvasSize, canvasSize);

            this.userAvatarUrl = canvas.toDataURL();
            localStorage.setItem('userAvatarUrl', this.userAvatarUrl);
          } else {
            console.error('Failed to get 2D context for canvas.');
          }
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  username: string = 'Dimitrina Yordanova';
  editedUsername: string = '';
  fullNameControl: FormControl = new FormControl("Initial Full Name");

  personalInfoControl: FormControl = new FormControl("");
  departmentControl: FormControl = new FormControl("");
  salaryControl: FormControl = new FormControl("");

  personalInfoFields: PersonalInfoField[] = [
    { label: "Full name", value: "Dimitrina Georgieva Yordanova", isEditing: false, options: ["Man", "Woman"] },
    { label: "Phone number", value: "0899315081", isEditing: false, options: ["Man", "Woman", "Other"] },
    { label: "Email address", value: "di.gyordanova@gmail.com", isEditing: false, options: ["Man", "Woman", "Other"] },
    { label: "Date of Birth", value: "10/12/1997", isEditing: false, options: ["Man", "Woman", "Other"] },
    { label: "Gender", value: "Female", isEditing: false, options: ["Man", "Woman", "Other"] },
    { label: "Country", value: "Bulgaria", isEditing: false, options: ["Bulgaria", "Rumania", "Spain"] },
    { label: "Languages", value: "English", isEditing: false, options: ["English", "Bulgarian", "Spanish", "French", "German", "Other"] },
    { label: "Full name", value: "Dimitrina Georgieva Yordanova", isEditing: false, options: ["Man", "Woman"] },
  ];

  departmentFields: DepartmentField[] = [
    { label: "Department", value: "IT", isEditing: false, options: ["Man", "Woman", "Other"] },
    { label: "Job Title", value: "Developer", isEditing: false, options: ["Man", "Woman", "Other"] },
    { label: "Supervisor", value: "Silvia Slavova", isEditing: false, options: ["Man", "Woman", "Other"] },
    { label: "Employee Status", value: "Full-time", isEditing: false, options: ["Man", "Woman", "Other"] },
    { label: "Joining Date", value: "2023-14-11", isEditing: false, options: ["Man", "Woman", "Other"] },
    { label: "Work Location", value: "Remote", isEditing: false, options: ["Man", "Woman", "Other"] }
  ];

  salaryFields: SalaryField[] = [
    { label: "Salary", value: "1500", isEditing: false, options: ["Man", "Woman", "Other"] },
    { label: "Currency", value: "USD", isEditing: false, options: ["USD", "LV", "Other"] }
  ];

  onProfileImageClick(): void {
    const inputElement: HTMLInputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = 'image/*';

    inputElement.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLInputElement;
      const files = target.files;

      if (files && files.length > 0) {
        const file: File = files[0];

        const reader = new FileReader();
        reader.onload = () => {
          const img = new Image();
          img.onload = () => {
            this.userAvatarUrl = reader.result as string;
            localStorage.setItem('userAvatarUrl', this.userAvatarUrl);
          };
          img.src = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    });
    inputElement.click();
  }

  editFieldData(field: any): void {
    field.isEditing = true;
    field.editedValue = field.value;
    field.showDropdown = false;
  }

  cancelEditField(field: any): void {
    field.isEditing = false;
    field.editedValue = field.value;
    field.showDropdown = false;
  }

  saveFieldData(field: any): void {
    field.isEditing = false;
    if (field.editedValue !== undefined) {
      field.value = field.editedValue;
    }
    field.options = undefined;
    field.showDropdown = false;
    localStorage.setItem('personalInfoFields', JSON.stringify(this.personalInfoFields));
    localStorage.setItem('departmentFields', JSON.stringify(this.departmentFields));
    localStorage.setItem('salaryFields', JSON.stringify(this.salaryFields));
  }

  toggleDropdown(field: PersonalInfoField): void {
    if (field.isEditing) {
      field.showDropdown = !field.showDropdown;
    }
  }
  toggleDropdownOnArrowClick(field: PersonalInfoField) {
    field.showDropdown = !field.showDropdown;
  }

  selectOption(field: PersonalInfoField, option: string): void {
    field.editedValue = option;
    field.showDropdown = false;
  }

  deleteField(field: any, fieldArray: any[]): void {
    const index = fieldArray.indexOf(field);
    if (index !== -1) {
      fieldArray.splice(index, 1);
      localStorage.setItem('personalInfoFields', JSON.stringify(this.personalInfoFields));
      localStorage.setItem('departmentFields', JSON.stringify(this.departmentFields));
      localStorage.setItem('salaryFields', JSON.stringify(this.salaryFields));
    }
  }

  editUsername() {
    this.isEditing = true;
    this.editedUsername = this.username;
  }

  saveUsername() {
    this.isEditing = false;
    this.username = this.editedUsername;
    this.editedUsername = '';
    localStorage.setItem('username', this.username);
  }

  editPersonalInfo() {
  }

  savePersonalInfo() {
  }

  newField: NewField = {
    label: '',
    value: ''
  };

  addNewField(): void {
    if (this.newField.label && this.newField.value) {
      const field: PersonalInfoField = {
        label: this.newField.label,
        value: this.newField.value,
        isEditing: false,
      };

      if (this.isPersonalInfoActive) {
        this.personalInfoFields.push(field);
        localStorage.setItem('personalInfoFields', JSON.stringify(this.personalInfoFields));
      } else if (this.isDepartmentInfoActive) {
        this.departmentFields.push(field);
        localStorage.setItem('departmentFields', JSON.stringify(this.departmentFields));
      } else if (this.isSalaryInfoActive) {
        this.salaryFields.push(field);
        localStorage.setItem('salaryFields', JSON.stringify(this.salaryFields));
      }
      this.isAddingNewField = false;
      this.newField.label = '';
      this.newField.value = '';
    } else {
      alert('Please enter label and value for the new field.');
    }
  }

  addNewPersonalField() {
    this.isAddingNewField = true;
  }
  addNewDepartmentField() {
    this.isAddingNewField = true;
  }
  addNewSalaryField() {
    this.isAddingNewField = true;
  }

  saveNewField(): void {
    if (!this.newField.label || !this.newField.value) {
      alert('Please enter label and value for the new field.');
      return;
    }

    const newField = {
      label: this.newField.label,
      value: this.newField.value,
      isEditing: false
    };

    if (this.isPersonalInfoActive) {
      this.personalInfoFields.push(newField);
      localStorage.setItem('personalInfoFields', JSON.stringify(this.personalInfoFields));
    } else if (this.isDepartmentInfoActive) {
      this.departmentFields.push(newField); 
      localStorage.setItem('departmentFields', JSON.stringify(this.departmentFields));
    } else if (this.isSalaryInfoActive) {
      this.salaryFields.push(newField); 
      localStorage.setItem('salaryFields', JSON.stringify(this.salaryFields));
    }

    this.newField.label = '';
    this.newField.value = '';

    this.isAddingNewField = false;
  }


  activateProfile() {
    this.isProfileActive = true;
    this.isPersonalActive = false;
    this.isDepartmentActive = false;
    this.isSalaryActive = false;
    this.router.navigateByUrl('/profile-page', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/profile-page']);
    });
  }
  // При натискане на тези бутони, кое се появява и кое не
  activatePersonal() {
    this.isPersonalActive = true;
    this.isDepartmentActive = false;
    this.isSalaryActive = false;
    this.isPersonalInfoActive = true;
    this.isDepartmentInfoActive = false;
    this.isSalaryInfoActive = false;
  }

  activateDepartment() {
    this.isPersonalActive = false;
    this.isDepartmentActive = true;
    this.isSalaryActive = false;
    this.isPersonalInfoActive = false;
    this.isDepartmentInfoActive = true;
    this.isSalaryInfoActive = false;
  }

  activateSalary() {
    this.isPersonalActive = false;
    this.isDepartmentActive = false;
    this.isSalaryActive = true;
    this.isPersonalInfoActive = false;
    this.isSalaryInfoActive = true;
    this.isDepartmentInfoActive = false;
  }
  //------------!
  activateDashboard() {
    this.isProfileActive = false;
    this.isDashboardActive = true;
    this.isDepartmentActive = false;
    this.isSalaryActive = false;
  }

  logout() {
  }

}
