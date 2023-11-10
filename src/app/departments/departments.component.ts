import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent {
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
  editingTitle: boolean[] = [];
  editingSubtitle: boolean[] = [];

  userAvatarUrl: string | ArrayBuffer | null = null;
  isHovered: boolean = false;

  constructor(private router: Router) { }
  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  departments = [
    {
      imageUrl: 'white',
      title: 'Title 1',
      subtitle: 'Subtitle 1'
    },
    {
      imageUrl: 'blue',
      title: 'Title 2',
      subtitle: 'Subtitle 2'
    },
    {
      imageUrl: 'red',
      title: 'Title 3',
      subtitle: 'Subtitle 3'
    },
    {
      imageUrl: 'black',
      title: 'Title 4',
      subtitle: 'Subtitle 4'
    },
    {
      imageUrl: 'green',
      title: 'Title 5',
      subtitle: 'Subtitle 5'
    },
  ];

  onFileSelected(): void {
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
          this.userAvatarUrl = reader.result;
          const uniqueKey = 'userAvatarUrl_' + window.location.pathname;
          localStorage.setItem(uniqueKey, this.userAvatarUrl as string);
          this.saveDepartments();
        };
        reader.readAsDataURL(file);
      }
    });

    inputElement.click();
  }

  ngOnInit() {
    const savedDepartments = localStorage.getItem('departments');
    if (savedDepartments) {
      this.departments = JSON.parse(savedDepartments);
    }

    const uniqueKey = 'userAvatarUrl_' + window.location.pathname;
    const storedUserAvatarUrl = localStorage.getItem(uniqueKey);

    if (storedUserAvatarUrl) {
      this.userAvatarUrl = storedUserAvatarUrl;
    }
  }

  get userAvatar(): string | ArrayBuffer | null {
    return this.userAvatarUrl || localStorage.getItem('userAvatarUrl') || null;
  }


  triggerFileInput(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  saveDepartments(): void {
    localStorage.setItem('departments', JSON.stringify(this.departments));
  }

  editTitle(index: number): void {
    this.editingTitle[index] = true;
  }

  saveTitle(index: number): void {
    this.editingTitle[index] = false;
    this.saveDepartments();
  }

  editSubtitle(index: number): void {
    this.editingSubtitle[index] = true;
  }

  saveSubtitle(index: number): void {
    this.editingSubtitle[index] = false;
    this.saveDepartments();
  }

  activateProfile() {
    this.isProfileActive = true;
    this.isPersonalActive = false;
    this.isDepartmentActive = false;
    this.isSalaryActive = false;
  }

  activateDepartment() {
    this.isPersonalActive = false;
    this.isDepartmentActive = true;
    this.isSalaryActive = false;
    this.isPersonalInfoActive = false;
    this.isDepartmentInfoActive = true;
    this.isSalaryInfoActive = false;
  }

  activateDashboard() {
    this.isProfileActive = false;
    this.isDashboardActive = true;
    this.isDepartmentActive = false;
    this.isSalaryActive = false;
  }

  logout() {
  }
}