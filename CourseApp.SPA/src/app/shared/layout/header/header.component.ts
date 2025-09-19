import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AlertifyService } from '../../services/alertify.service';
import { AuthService } from '../../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { FirstnamePipe } from '../../pipes/firstname.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  alertifyService = inject(AlertifyService);
  authService = inject(AuthService);
  router = inject(Router);
  defaultImg = '../user.png';
  imageUrl!: any;

  ngOnInit(): void {
    this.authService.currentPhotoUrl.subscribe((photoURL) => {
      this.imageUrl = photoURL;
    });
  }

  loggedin() {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('token'); // or whatever you're checking
    }
    return false; // or handle appropriately for SSR
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertifyService.message('logged out');
    this.router.navigateByUrl('/courses');
    // this.router.navigateByUrl('home');
  }
}
