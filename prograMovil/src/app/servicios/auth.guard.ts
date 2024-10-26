import { CanActivateFn, Router } from '@angular/router';
import { AutenticadorService } from './autenticador.service';
import { inject } from '@angular/core';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AutenticadorService);
  const router = inject(Router);

  //Validamos si esta conectado
  //Si lo esta, tendra acceso a ciertas paginas
  //Si no , sera redireccionado a la pagina correspondiente
  if (authService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};
