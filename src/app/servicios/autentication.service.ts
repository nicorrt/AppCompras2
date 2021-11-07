import { Injectable, NgZone } from '@angular/core';
//import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider} from "firebase/auth";


import { Observable } from 'rxjs';
import { User } from 'src/model/User';
//import firebase from "firebase/compat/app";
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class AutenticationService {

  public user:User|null=null;
  public ready:boolean=false;
  public $ready:Observable<any>|null = null;

  constructor(public authf: AngularFireAuth) {
    this.checkSSO();
   }
      //Método de registro de usuario via web y contraseña, para un nuevo usuario
    public registroUsuario(userdata: {email:any; password:any;}): Promise<firebase.default.auth.UserCredential>{
      return this.authf.createUserWithEmailAndPassword(userdata.email, userdata.password);
    }
      //Método para el inicio de sesión de un usuario ya registrado
    public inicioSesion(userdata: {email:any;password:any}): Promise<firebase.default.auth.UserCredential>{
      console.log(userdata)
      return this.authf.signInWithEmailAndPassword(userdata.email,userdata.password);
    }
      //Método para iniciar sesión desde una cuenta de Google
    public googleLogin(): Promise<firebase.default.auth.UserCredential>{
      return this.authf.signInWithPopup(new GoogleAuthProvider());
    }

    public setUser(u:firebase.default.auth.UserCredential | null| any |firebase.default.User):void{
      if(u && u.user){
        this.user={
          displayName:u.user?.displayName,
          email:u.user?.email,
          photoURL:u.user?.photoURL,
          uid:u.user?.uid
        }
      }else{
        this.user=null;
      }
    }
    public setUserEmail(u:firebase.default.auth.EmailAuthProvider | null| any |firebase.default.User):void{
      if(u && u.user){
        this.user={
          displayName:u.user?.displayName,
          email:u.user?.email,
          photoURL:u.user?.photoURL,
          uid:u.user?.uid
        }
      }else{
        this.user=null;
      }
    }
    
    public get isLogged():boolean{  //el get transforma la funcion en variable
      return this.user?true:false;
    }


    public checkSSO():void{
      this.$ready=new Observable((observer) =>{
            //comprobar si tenemos sesion abierta en nuestro SSO Provider
      try{
        this.authf.authState.subscribe((data)=>{
          console.log(data);
          this.ready=true;
          if(data!=null){
            this.setUser({user:data});
            observer.next(true);
          }else{
            this.setUser(null);
            observer.next(false);
          }
          observer.complete();
      })
      }catch(err){
        console.log;
        this.setUser(null);
        this.ready=true;
        observer.next(true);
        observer.complete();
      } 
      })  
    }

    //Método para cerrar la sesión activa
    public logout():Promise<void>{
      return new Promise(async(resolve,reject)=>{
        if(this.isLogged){
          try {
            await this.authf.signOut();
            this.setUser(null);
            resolve();
          } catch (err) {
            reject(err);
          }
        }
      })
    }
}
