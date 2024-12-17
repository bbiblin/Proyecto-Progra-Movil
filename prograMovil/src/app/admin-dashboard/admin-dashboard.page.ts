import { Component, OnInit } from '@angular/core';
import { ApicontroladorService } from '../servicios/apicontrolador.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage implements OnInit {
  username: string = ''; // Nombre de usuario ingresado
  asistencias: string[] = []; // Almacena los idAsistencia del usuario
  mensaje: string = ''; // Mensaje de feedback

  constructor(private apiService: ApicontroladorService) {}

  ngOnInit() {}

  buscarAsistencias() {
    if (!this.username) {
      this.mensaje = 'Por favor ingrese un nombre de usuario';
      return;
    }

    this.apiService.getAsistencias().subscribe({
      next: (data) => {
        const asistenciasFiltradas = data.filter(
          (item: any) => item.username === this.username
        );

        if (asistenciasFiltradas.length > 0) {
          this.asistencias = asistenciasFiltradas.map(
            (item: any) => item.idAsistencia
          );
          this.mensaje = '';
        } else {
          this.asistencias = [];
          this.mensaje = 'No se encontraron asistencias para este usuario.';
        }
      },
      error: (err) => {
        console.error('Error al obtener las asistencias:', err);
        this.mensaje = 'Hubo un error al obtener las asistencias.';
      },
    });
  }
}
