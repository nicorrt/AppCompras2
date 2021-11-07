import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { AutenticationService } from 'src/app/servicios/autentication.service';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';
import { AddproveeComponent } from '../addprovee/addprovee.component';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {
  proveedores: any[] = [];
  proveedor:any;
  key: string = "";
  
  constructor(private authS: AutenticationService, private provedoresService: ProveedoresService,private router:Router, private db:AngularFireDatabase) {
    this.proveedores=this.provedoresService.getProveedores();
   }

  ngOnInit(): void {
   console.log(this.authS.isLogged)
    this.authS.$ready?.subscribe((data)=>{
      if(data){
        console.log(this.authS.isLogged)
      }
    })

  }

  eliminarProveedores(proveedor:AddproveeComponent){ 

    this.proveedor=this.provedoresService.delProveedor(proveedor.key);
    this.proveedores=this.provedoresService.getProveedores();
  }

  editarProveedores(proveedor:AddproveeComponent){
    this.proveedor=this.provedoresService.editProveedores(proveedor.key);
  }

  

}
