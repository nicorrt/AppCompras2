import { Component, OnInit } from '@angular/core';
import { PresupuestosService } from 'src/app/servicios/presupuestos.service';
import {AngularFireDatabase} from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { InterfazPresupuesto } from '../interfaz-presupuesto';
import { AddpresComponent } from 'src/app/pages/presupuesto/addpres/addpres.component';
import {FormGroup, FormControl} from '@angular/forms'
import { AutenticationService } from 'src/app/servicios/autentication.service';

@Component({
  selector: 'app-presupuestos',
  templateUrl: './presupuestos.component.html',
  styleUrls: ['./presupuestos.component.css']
})
export class PresupuestosComponent implements OnInit {

  presupuestos: any[] = [];
  presupuesto:any;
  key: string = "";

  constructor(private authS: AutenticationService, private presupuestoService: PresupuestosService,private router:Router, private db:AngularFireDatabase) {

      this.presupuestos=this.presupuestoService.getPresupuestos();

   }

  ngOnInit(): void {
    console.log(this.authS.isLogged)
    this.authS.$ready?.subscribe((data)=>{
      if(data){
        console.log("JIJI")
        console.log(this.authS.isLogged)
      }
    })
  }

  eliminarPresupuesto(presupuesto:AddpresComponent){ 

    this.presupuesto=this.presupuestoService.delPresupuesto(presupuesto.key);
    this.presupuestos=this.presupuestoService.getPresupuestos();
  }

  editarPresupuesto(presupuesto:AddpresComponent){
    this.presupuesto=this.presupuestoService.editPresupuesto(presupuesto.key);
  }

  

  

   //Listar


    /*this.db.object("/jugadores").valueChanges().subscribe((data)=>{
      console.log
    })*/

    //this.db.list("/Jugadores").remove();  // Borra todos los Jugadores 


    //this.db.database.ref().child("Jugadores").startAt(0).endAt(5)


}
