import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  public alertaExito(titulo: string, texto: string): void {
    Swal.fire({
        title: titulo,
        text: texto,
        icon: 'success'
    });
  }

  public alertaError(titulo: string, texto: string): void {
    Swal.fire({
        title: titulo,
        text: texto,
        icon: 'error'
    });
  }

  public alertaAviso(titulo: string, texto: string): void {
    Swal.fire({
        title: titulo,
        text: texto,
        icon: 'warning'
    });
  }

  public alertaInformacion(titulo: string, texto: string): void {
    Swal.fire({
        title: titulo,
        text: texto,
        icon: 'info'
    });
  }

  public alertaPregunta(titulo: string, texto: string): void {
    Swal.fire({
        title: titulo,
        text: texto,
        icon: 'question'
    });
  }
}
