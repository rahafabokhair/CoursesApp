import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClassOrder, User } from '../../core/models/object-model';
import { UserService } from '../../shared/services/user.service';
import { error } from 'node:console';
import { FileUploadService } from '../../shared/services/file-upload.service';
import {
  BsDatepickerConfig,
  BsDatepickerModule,
} from 'ngx-bootstrap/datepicker';
import { switchMap } from 'rxjs';
import { AlertifyService } from '../../shared/services/alertify.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, BsDatepickerModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  @Output() canceledRegister: any = new EventEmitter();
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  userService = inject(UserService);
  alertifyService = inject(AlertifyService);
  fileUploadService = inject(FileUploadService);

  router = inject(Router);
  registerForm!: FormGroup;

  //file
  selectedFile!: File;
  previewUrl: string | ArrayBuffer | null = null;
  bsConfig!: Partial<BsDatepickerConfig>;
  user!: User;
  // classOrder: ClassOrder[] = [
  //   { id: 3, name: 'الصف الأول' },
  //   { id: 4, name: 'الصف الثاني' },
  // ];
  constructor() {
    // this.userService.getClassOrder().subscribe((data) => {
    //   console.log(data);

    //   this.classOrder = data;
    // });
    this.bsConfig = {
      containerClass: 'theme-red',
    };
    this.registerForminit();
  }

  registerForminit() {
    this.registerForm = this.formBuilder.group(
      {
        photoUrl: [null],
        gender: ['male'],
        username: ['', [Validators.required]],
        dateOfBirth: [null, Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(8),
          ],
        ],
        confirmPassword: new FormControl('', Validators.required),
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }


  onRegister(registerForm: any) {
    this.user = { ...registerForm.value };

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.fileUploadService
      .uploadImage(formData)
      .pipe(
        switchMap((photoURL: any) => {
          this.user.photoURL = photoURL;
          return this.authService.register(this.user);
        }),
        switchMap(() => this.authService.login(this.user))
      )
      .subscribe(
        () => {
          this.alertifyService.success('user registered');
        },
        (error) => {
          this.alertifyService.error(error);
        },
        () => {
          this.authService.login(this.user).subscribe(() => {
            this.router.navigateByUrl('/courses');
          });
        }
      );
  }
 
  getImage() {
  return this.previewUrl
    ? `url(${this.previewUrl})`
    : 'url(../user.png)'; // fallback image
}

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => (this.previewUrl = reader.result);
      reader.readAsDataURL(file);
    }
  }

  canceled() {
    this.canceledRegister.emit(false);
  }
  get f(): {[key: string]: AbstractControl } {
    return this.registerForm.controls;
  }
}
