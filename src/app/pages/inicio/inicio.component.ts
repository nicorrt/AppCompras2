import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutenticationService } from 'src/app/servicios/autentication.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  public loggingout:boolean=false;

  registroForm: FormGroup|any;
  userdata: any;
  mensaje = false;

  
  constructor(public authS:AutenticationService, private router:Router,
    private activatedRoute:ActivatedRoute, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
      'email': ['', [
      Validators.required,
      Validators.email
      ]
      ],
      'password': ['', [
      Validators.required,
      Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
      Validators.minLength(6)
      ]
      ]
      });

   if(this.authS.isLogged){
      console.log("fallo!");
      this.router.navigate(['/iniciosesion']);
    }
    setTimeout(() => {
      console.log(this.authS.isLogged)
    }, 1000);

    this.authS.$ready?.subscribe((data)=>{
      if(data){
        console.log("probando")
        console.log(this.authS.isLogged)
        this.router.navigate(['/iniciosesion']);
      }
    })
  }

  login(){
    this.authS.googleLogin().then((data)=>{
      this.authS.setUser(data);
      if(this.authS.isLogged){
        console.log("entrando por login")
        this.router.navigate(['/iniciosesion']);
      }
    }).catch(err=>{
      console.log(err);
    })
  }

  loginEmail(){
    this.userdata=this.saveUserdata();
    this.authS.inicioSesion(this.userdata).then((data)=>{
      this.authS.setUser(data);
      console.log("entrando por mail")
      this.router.navigate(['/iniciosesion']);
      
    }).catch(err=>{
      console.log(err);
    })
  }

  saveUserdata() {
    const saveUserdata = {
    email: this.registroForm.get('email')?.value,
    password: this.registroForm.get('password')?.value,
    };
    return saveUserdata;
    }



  
  public async logout(){
    //deshabilito el boton de logout//muestro espere
    this.loggingout=true;
    try {
      await this.authS.logout();
      this.router.navigate(['/login']);
      this.loggingout=false;
      
    } catch (err) {
      //toast no he podido cerrar sesion
      this.loggingout=false;
      alert(err)
    }
  }

}
