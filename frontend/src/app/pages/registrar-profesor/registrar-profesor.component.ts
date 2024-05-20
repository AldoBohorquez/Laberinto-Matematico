import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-profesor',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './registrar-profesor.component.html',
  styleUrl: './registrar-profesor.component.css',
})
export class RegistrarProfesorComponent {
  fb = inject(FormBuilder);
  apiS = inject(ApiService);
  route = inject(Router);
  activeRoute = inject(ActivatedRoute);
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
      timer: 1500,
    });
  }

  constructor(fb: FormBuilder) {
    this.formProduct = this.fb.group({
      nombreCompleto: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  saveProfesor() {
    if (this.formProduct.invalid) {
      console.log('invalid');
      return;
    }

    this.apiS.nuevoProfesor(this.formProduct.value).subscribe((data) => {
      console.log(data);
      this.formProduct.reset();
      this.route.navigateByUrl('/login');
      this.alert('Información de usuario guardada exitosamente', 'success');
    });
  }
}
