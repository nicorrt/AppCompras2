import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import{ FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';


@Component({
  selector: 'app-addprovee',
  templateUrl: './addprovee.component.html',
  styleUrls: ['./addprovee.component.css']
})
export class AddproveeComponent implements OnInit {

  proveedor:any;
  proveedorForm!: FormGroup;
  key!: string;



  constructor(private pf:FormBuilder, private proveedoresService: ProveedoresService, private db:AngularFireDatabase) {

   }
   onSubmit(){
    this.proveedor = this.saveProveedor();
    }


  ngOnInit(): void {
    if(this.proveedor==null){
      this.proveedorForm = this.pf.group({
        nombre: ['', Validators.required ],
        cif: ['', Validators.required ],
        direccion: ['', Validators.required ],
        cp: ['',  Validators.required],
        localidad: ['', Validators.required ],
        provincia: ['', Validators.required ],
        telefono: ['', [Validators.required, Validators.minLength(5)]], 
        email: ['', Validators.required],
        contacto: ['', Validators.required]
        });

      }else{
        this.refreshFormulario();
      }
  }

  refreshFormulario(){
    this.proveedor=this.proveedorForm.setValue(this.proveedor);
  }

  saveProveedor() {
    const saveProveedor = {
    nombre: this.proveedorForm.get('nombre')?.value,
    cif: this.proveedorForm.get('cif')?.value,
    direccion: this.proveedorForm.get('direccion')?.value,
    cp: this.proveedorForm.get('cp')?.value,
    localidad: this.proveedorForm.get('localidad')?.value,
    provincia: this.proveedorForm.get('provincia')?.value,
    telefono: this.proveedorForm.get('telefono')?.value,
    email: this.proveedorForm.get('email')?.value,
    contacto: this.proveedorForm.get('contacto')?.value,
    };
    this.proveedoresService.addpress(saveProveedor);
    this.proveedorForm.reset();
    return saveProveedor;
    }

}
