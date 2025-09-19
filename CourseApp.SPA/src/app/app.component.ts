import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/layout/header/header.component';
import { AuthService } from './auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './core/models/object-model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  authService = inject(AuthService);
  jwtHelper = new JwtHelperService();
  ngOnInit(): void {
     if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const user: User = JSON.parse(localStorage.getItem('user') || '{}');

      if (token) {
        this.authService.decodedToken = this.jwtHelper.decodeToken(token);
      }
      if (user) {
        this.authService.currentUser = user;
        this.authService.changePhotoUrl(user.photoURL);
      }
    }
   }
}
