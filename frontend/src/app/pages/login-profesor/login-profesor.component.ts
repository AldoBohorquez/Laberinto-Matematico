import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AutenticacionService } from '../../services/autenticacion.service';
import { Profesor } from '../../interfaces/profesor.interface';

@Component({
  selector: 'app-login-profesor',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login-profesor.component.html',
  styleUrl: './login-profesor.component.css'
})


export class LoginProfesorComponent {

  fb = inject(FormBuilder);
  route = inject(Router);
  apiS = inject(ApiService);
  authService = inject(AutenticacionService);
  formProduct!: FormGroup;

  alert(
    msn: string,
    icon: 'error' | 'info' | 'question' | 'success' | 'warning'
  ) {
    Swal.fire({
      text: msn,
      icon: icon,
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 2000,
    });
  }

  constructor(fb: FormBuilder) {
    this.formProduct = this.fb.group({
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }


  logueado() {
    if (this.formProduct.valid) {
      this.apiS.loginProfesor(this.formProduct.value).subscribe(
        (response: Profesor) => {
          this.authService.login(response);
          this.route.navigateByUrl('/bienvenida');
          console.log('Login exitoso', response);
        },
        (error) => {
          this.alert('Usuario o contraseña incorrectos', 'error');
          console.error('Error en el login', error);
        }
      );
    }
  }




}
