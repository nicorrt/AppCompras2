import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class ProveedoresService {
  proveedor:any;

  constructor(private db:AngularFireDatabase) { }

    addpress(proveedor: any){
      return  this.db.database.ref().child("proveedores").push(proveedor);
    }

    getProveedores():any[] {
 
      let list: any[] = [];
     
      this.db.database.ref().child("proveedores").get().then((data)=>{
    
        const proveedores=data.val();
        for(let proveedor in proveedores){
          /*const p = presupuestos[presupuesto];
          p.presupuesto=presupuesto;*/
          list.push({ key: proveedor, ...proveedores[proveedor]});
        }
      })
     return list;
    }

    async getProveedor(key:string){

      let tmp=await this.db.database.ref().child("proveedores").child(key).get();
      let result= tmp.val();
      result.$key=key; 
      return result;

  }

  delProveedor(key:string){ 
    const confirmacion = confirm("¿Estas seguro de querer Borrar el proveedor?");
    if(confirmacion){
      this.db.database.ref().child("proveedores").child(key).remove();
    }
  }
  editProveedores(key:string){
    
    const confirmacion = confirm("Estas seguro de querer Editar el presupuesto");
    if(confirmacion){
      this.db.database.ref().child("proveedor").child(key).update({
        nombre: this.proveedor.nombre,
        cif: this.proveedor.cif,
        direccion:this.proveedor.direccion,
        cp:this.proveedor.cp,
        localidad:this.proveedor.localidad,
        provincia:this.proveedor.provincia,
        telefono:this.proveedor.telefono,
        email:this.proveedor.telefono,
        contacto:this.proveedor.contacto
      });
    }
  }

  putProveedor(proveedor: any, key: string) {
    this.db.database.ref().child("proveedores").child(key).update(proveedor);
  }

  postPresupuesto(proveedor: any): void {
    this.db.database.ref().child("proveedores").push(proveedor);
    console.log(proveedor);
  }
}
