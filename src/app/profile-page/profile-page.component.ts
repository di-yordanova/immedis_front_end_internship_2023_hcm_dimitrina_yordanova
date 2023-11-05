import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface PersonalInfoField {
  label: string;
  value: string;
  isEditing: boolean;
  editedValue?: string;
}

interface DepartmentField {
  label: string;
  value: string;
  isEditing: boolean;
  editedValue?: string;
}

interface SalaryField {
  label: string;
  value: string;
  isEditing: boolean;
  editedValue?: string;
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

  userAvatarUrl: string | ArrayBuffer | null = null;
  isHovered: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Проверете Local Storage за URL на снимката при зареждане на компонента
    const storedUserAvatarUrl = localStorage.getItem('userAvatarUrl');
    const storedPersonalInfoFields = localStorage.getItem('personalInfoFields');
    
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
    { label: "Full name", value: "Dimitrina Georgieva Yordanova", isEditing: false },
    { label: "Phone number", value: "0899315081", isEditing: false },
    { label: "Email address", value: "di.gyordanova@gmail.com", isEditing: false },
    { label: "Date of Birth", value: "10/12/1997", isEditing: false },
    { label: "Gender", value: "Female", isEditing: false },
    { label: "Nationality", value: "Bulgarian", isEditing: false },
    { label: "Languages", value: "English, Bulgarian", isEditing: false },
  ];

  departmentFields: DepartmentField[] = [
    { label: "Department", value: "IT", isEditing: false },
    { label: "Job Title", value: "Developer", isEditing: false },
    { label: "Supervisor", value: "Silvia Slavova", isEditing: false },
    { label: "Employee Status", value: "Full-time", isEditing: false },
    { label: "Joining Date", value: "2023-14-11", isEditing: false },
    { label: "Work Location", value: "Remote", isEditing: false }
  ];

  salaryFields: SalaryField[] = [
    { label: "Salary", value: "1500", isEditing: false },
    { label: "Currency", value: "USD", isEditing: false }
  ];

  onProfileImageClick(): void {
    // Създаване на input елемент от тип "file"
    const inputElement: HTMLInputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = 'image/*'; // Само изображения са разрешени

    // Добавяне на event listener, който се изпълнява, когато потребителят избере файл
    inputElement.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLInputElement;
      const files = target.files;

      if (files && files.length > 0) {
        const file: File = files[0]; // Взимане на първия избран файл

        const reader = new FileReader();
        reader.onload = () => {
          const img = new Image();
          img.onload = () => {
            // Тук може да извършите допълнителна обработка на изображението, ако е необходимо

            // Пример: Променяте профилната снимка с новата
            this.userAvatarUrl = reader.result as string;
            localStorage.setItem('userAvatarUrl', this.userAvatarUrl);
          };
          img.src = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    });

    // Имитиране на кликване на input елемента, за да се отвори диалоговият прозорец за избор на файл
    inputElement.click();
  }


  editFieldData(field: PersonalInfoField) {
    field.isEditing = true;
    field.editedValue = field.value;
  }

  saveFieldData(field: PersonalInfoField) {
    field.isEditing = false;
    if (field.editedValue !== undefined) {
      field.value = field.editedValue;
    }

    // Запазване на актуалните данни в Local Storage
    localStorage.setItem('personalInfoFields', JSON.stringify(this.personalInfoFields));
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
    this.editedUsername = '';
  }

  editPersonalInfo() {
  }

  savePersonalInfo() {
  }

  addNewPersonalField() {
    const newField: PersonalInfoField = { label: "New Field", value: "", isEditing: true };
    this.personalInfoFields.push(newField);
  }
  addNewDepartmentField() {
    const newField: DepartmentField = { label: "New Field", value: "", isEditing: true };
    this.departmentFields.push(newField);
  }
  addNewSalaryField() {
    const newField: SalaryField = { label: "New Field", value: "", isEditing: true };
    this.salaryFields.push(newField);
  }

  activateProfile() {
    this.isProfileActive = true;
    this.isPersonalActive = false;
    this.isDepartmentActive = false;
    this.isSalaryActive = false;
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
