import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { InterfazPresupuesto } from '../presupuesto/interfaz-presupuesto';
import { PresupuestosComponent } from '../presupuesto/presupuestos/presupuestos.component';


@Injectable({
  providedIn: 'root'
})
export class PresupuestosService {
  presupuestosRef!: AngularFireList<any>;
  presupuestoRef!: AngularFireObject<any>;
  presupuesto:any;
  //id: string = "-MnV6SUylnguaIIaQhyu";


  constructor(private db:AngularFireDatabase
    ) {
      
   }
/*
  AddPresupuesto(presupuesto: InterfazPresupuesto){
     this.presupuestosRef.push({
      proveedor: presupuesto.proveedor,
      fecha: presupuesto.fecha,
      cif: presupuesto.cif,
      concepto: presupuesto.concepto,
      base: presupuesto.base,
      tipo: presupuesto.tipo,
      iva: presupuesto.iva ,
      total: presupuesto.total,
     })
   }

   GetPresupuesto(id: string){
    this.presupuestoRef = this.db.object("presupuestos/"+id)
    return this.presupuestoRef;
   }

   GetPresupuestosList(){
     this.presupuestosRef=this.db.list("presupuestos");
     return this.presupuestosRef;
   }

   UpdatePresupuestos(presupuesto : InterfazPresupuesto){
      this.presupuestoRef.update({
        proveedor: presupuesto.proveedor,
        fecha: presupuesto.fecha,
        cif: presupuesto.cif,
        concepto: presupuesto.concepto,
        base: presupuesto.base,
        tipo: presupuesto.tipo,
        iva: presupuesto.iva ,
        total: presupuesto.total,
      })
   }

   DeletePresupuesto(id: string){
      this.presupuestoRef = this.db.object("presupuestos/"+id);
      this.presupuestoRef.remove();
   }
*/

   
   addpress(presupuesto: any){
     return  this.db.database.ref().child("presupuestos").push(presupuesto);
   }

   
   getPresupuestos():any[] {
 
    let list: any[] = [];
   
    this.db.database.ref().child("presupuestos").get().then((data)=>{
  
      const presupuestos=data.val();
      for(let presupuesto in presupuestos){
        /*const p = presupuestos[presupuesto];
        p.presupuesto=presupuesto;*/
        list.push({ key: presupuesto, ...presupuestos[presupuesto]});
      }
    })
   return list;
  }

  async getPresupuesto(key:string){

      let tmp=await this.db.database.ref().child("presupuestos").child(key).get();
      let result= tmp.val();
      result.$key=key; 
      return result;

  }

  delPresupuesto(key:string){ 
    const confirmacion = confirm("¿Estas seguro de querer Borrar el presupuesto?");
    if(confirmacion){
      this.db.database.ref().child("presupuestos").child(key).remove();
    }
  }

  editPresupuesto(key:string){
    
    const confirmacion = confirm("Estas seguro de querer Editar el presupuesto");
    if(confirmacion){
      this.db.database.ref().child("presupuestos").child(key).update({
        proveedor: this.presupuesto.proveedor,
        fecha: this.presupuesto.fecha,
        cif: this.presupuesto.cif,
        concepto: this.presupuesto.concepto,
        base: this.presupuesto.base,
        tipo: this.presupuesto.tipo,
        iva: this.presupuesto.iva ,
        total: this.presupuesto.total,
      });
    }
  }

  putPresupuesto(presupuesto: any, key: string) {
    this.db.database.ref().child("presupuestos").child(key).update(presupuesto);
  }

  postPresupuesto(presupuesto: any): void {
    this.db.database.ref().child("presupuestos").push(presupuesto);
    console.log(presupuesto);
  }
   

}
