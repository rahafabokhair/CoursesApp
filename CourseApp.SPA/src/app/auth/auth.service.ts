import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ApiService } from '../core/services/api.service';
import { User } from '../core/models/object-model';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth_url = environment.server_url + '/api/auth/';
  apiService = inject(ApiService);
  jwtHelper = new JwtHelperService();
  public decodedToken: any;
  currentUser!: any;


  photoURL = new BehaviorSubject<string>('../../user.png');
  currentPhotoUrl = this.photoURL.asObservable();


  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  changePhotoUrl(photoUrl: string) {
    this.photoURL.next(photoUrl);
  }

  login(userInfo: any) {
    return this.apiService.post(this.auth_url + 'login', userInfo).pipe(
      map((user) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.currentUser = user.user;
          this.changePhotoUrl(this.currentUser?.photoURL);
        }
      })
    );
  }

  register(user: User) {
    return this.apiService.post(this.auth_url + 'register', user);
  }
  loggedin() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      return token != null && !this.jwtHelper.isTokenExpired(token);
    }
    return false;

  }
  get userId(): string | null {
    return this.decodedToken ? this.decodedToken.nameid : null;
  }
}
