import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) { }

  login(){
    this.loggedIn.next(true);
  }

  logout(){
    this.loggedIn.next(false);
    this.router.navigate(['/home']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  isLoggedInSync(): boolean {
    return this.loggedIn.getValue();
  }

}
