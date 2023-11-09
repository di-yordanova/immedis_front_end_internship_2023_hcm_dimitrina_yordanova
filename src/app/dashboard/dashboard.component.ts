import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
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

  private _userAvatarUrl: string | ArrayBuffer | null = null;
  private _editedText: string = 'Default Text';
  editText() {
    this.isEditing = true;
  }

  saveText() {
    localStorage.setItem('editedText', this.editedText);
    this.isEditing = false;
  }

  isHovered: boolean = false;

  headerTitle: string = 'headerTitle'; 
  subHeader: string = 'subHeader';
  isHeaderEditing: boolean = false;

  constructor(private router: Router) { }
  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  ngOnInit(): void {
    const uniqueKey = 'userAvatarUrl_' + window.location.pathname;
    const storedUserAvatarUrl = localStorage.getItem(uniqueKey);

    if (storedUserAvatarUrl) {
      this._userAvatarUrl = storedUserAvatarUrl;
    }

    const storedHeaderTitle = localStorage.getItem('headerTitle');
    const storedSubHeader = localStorage.getItem('subHeader');
    if (storedHeaderTitle) {
      this.headerTitle = storedHeaderTitle;
    }

    if (storedSubHeader) {
      this.subHeader = storedSubHeader;
    }

    const storedText = localStorage.getItem('editedText');
    if (storedText) {
      this.editedText = storedText;
    }
  }

  get userAvatar(): string | ArrayBuffer | null {
    return this._userAvatarUrl || localStorage.getItem('userAvatarUrl') || null;
  }

  get editedText(): string {
    return this._editedText || localStorage.getItem('editedText') || 'Default Text';
  }
  set editedText(value: string) {
    this._editedText = value;
    localStorage.setItem('editedText', this._editedText);
  }

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
          this._userAvatarUrl = reader.result;
          const uniqueKey = 'userAvatarUrl_' + window.location.pathname;
          localStorage.setItem(uniqueKey, this._userAvatarUrl as string);
        };
        reader.readAsDataURL(file);
      }
    });

    inputElement.click();
  }

  generateUniqueId(): string {
    return new Date().getTime().toString();
  }

  editHeader() {
    this.isHeaderEditing = true;
  }

  saveHeader() {
    localStorage.setItem('headerTitle', this.headerTitle);
    localStorage.setItem('subHeader', this.subHeader);
    this.isHeaderEditing = false;
  }

  saveChanges() {
    this.isSaving = true;
    setTimeout(() => {
      this.isSaving = false;
    }, 2000);
  }

  deleteUser() {
  }

  activateProfile() {
    this.isProfileActive = true;
    this.isPersonalActive = false;
    this.isDepartmentActive = false;
    this.isSalaryActive = false;
  }


  activateDashboard() {
    this.isProfileActive = false;
    this.isDashboardActive = true;
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
  logout() {
  }
}
