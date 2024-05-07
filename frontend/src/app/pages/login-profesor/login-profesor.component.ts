import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login-profesor',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './login-profesor.component.html',
  styleUrl: './login-profesor.component.css'
})
export class LoginProfesorComponent {
  constructor(private router: Router) {}

  onSubmit() {
    this.router.navigate(['/bienvenida']);
  }

}
