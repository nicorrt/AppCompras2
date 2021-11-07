import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticationService } from 'src/app/servicios/autentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public loggingout:boolean=false;
  public isLogged:boolean=false;
  constructor(public authS:AutenticationService, private router:Router) { }

  ngOnInit(): void {
  }
  isAuth() {
    return this.authS.isLogged;
    }

  public async logout(){
    //deshabilito el boton de logout//muestro espere
    this.loggingout=true;
    try {
      await this.authS.logout();
      this.router.navigate(['']);
      this.loggingout=false;
      
    } catch (err) {
      //toast no he podido cerrar sesion
      this.loggingout=false;
      alert(err)
    }
  }

}
