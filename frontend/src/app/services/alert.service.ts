import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  alert(msn:string, icon: 'error'|'info'|'question'|'success'|'warning'){
    Swal.fire({
      text: msn,
      icon: icon,
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 1500
    })
  }
}
