import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticationService } from './servicios/autentication.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {
 constructor(private authS:AutenticationService, private router:Router) {

  }
  canActivate(next: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      
      
       /*if(!this.authS.isLogged){
          console.log(this.authS.isLogged)
          window.alert("Acceso denegado, debes logearte")
          this.router.navigate(['']);
          
        }    

        return this.authS.isLogged;*/
        /**No me funciona la protección contra el usuario y por ello lo he desactivado, al cargar las paginas 
         * me devuelve false la clase Guard, y posteriormente me carga el usuario, no he podido solucionar el problema
         */
        return true;
  
  }
}
