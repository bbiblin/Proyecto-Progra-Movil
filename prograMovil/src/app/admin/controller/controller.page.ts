import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { APIControllerService } from 'src/app/servicios/apicontroller.service';
@Component({
  selector: 'app-controller',
  templateUrl: './controller.page.html',
  styleUrls: ['./controller.page.scss'],
})
export class ControllerPage implements OnInit {
  users: any[] = [];
  isModalOpen: boolean = false;
  nuevoUsuario: any = { name: '', email: '' };
  usuarioSeleccionado: any = null;
  mostrarFormulario: boolean = false;

  @ViewChild('formulario', { read: ElementRef }) formularioElement!: ElementRef;

  @ViewChild('formulario2', { read: ElementRef }) formulario2Element!: ElementRef;

  constructor(private api: APIControllerService) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.api.getUsers().subscribe((data) => {
      this.users = data
      console.log(this.users)
    },
      (error) => {
        console.log("Error en la llamada :" + error)
      });
  }

  seleccionarUsuario(usuario: any) {
    this.usuarioSeleccionado = { ...usuario };
    if (this.usuarioSeleccionado) {
      setTimeout(() => {
        if (this.formulario2Element?.nativeElement) {
          this.formulario2Element.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          console.warn("El formulario no se ha podido encontrar en el DOM.");
        }
      }, 200);
    }

  }

  modificarUsuario(id: any) {
    this.api.updateUser(id, this.usuarioSeleccionado).subscribe(
      (response) => {
        console.log('Usuario modificado:', response);
        this.cargarUsuarios();
        this.usuarioSeleccionado = null;  
      },
      (error) => {
        console.log('Error al modificar usuario:', error);
      }
    );
  }

  crearUsuario() {
    if (this.nuevoUsuario.username && this.nuevoUsuario.email && this.nuevoUsuario.password) {
      this.api.postUser(this.nuevoUsuario).subscribe(
        (response) => {
          console.log('Usuario creado:', response);
          this.cargarUsuarios(); 
          this.isModalOpen = false; 
          this.nuevoUsuario = { username: '', email: '', password: '' };
          this.mostrarFormulario = false;
        },
        (error) => {
          console.log('Error al crear usuario:', error);
        }
      );
    } else {
      console.log('Por favor completa todos los campos');
    }
  }

  eliminarUsuario(id: number) {
    if (!id) {
      console.error('ID del usuario no está definido');
      return;
    }
  
    this.api.deleteUser(id).subscribe(
      (response) => {
        console.log('Usuario eliminado:', response);
        this.cargarUsuarios();
      },
      (error) => {
        console.log('Error al eliminar usuario:', error);
      }
    );
  }

  /*
  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }
  */

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;

    if (this.mostrarFormulario) {
      setTimeout(() => {
        if (this.formularioElement?.nativeElement) {
          this.formularioElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          console.warn("El formulario no se ha podido encontrar en el DOM.");
        }
      }, 200);
    }
  }
}