
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';

@Component({
  selector: 'app-editprovee',
  templateUrl: './editprovee.component.html',
  styleUrls: ['./editprovee.component.css']
})
export class EditproveeComponent implements OnInit {

  proveedorForm!: FormGroup;
  nombre:any;
  cif:any;
  direccion:any;
  cp:any;
  localidad:any;
  provincia:any;
  telefono:any;
  email:any;
  contacto:any;

  key!: string;
  proveedores: any[] = [];
  proveedor:any;



  constructor(private pf: FormBuilder,
    private proveedoresService: ProveedoresService,
    private router:Router,
    private cdref:ChangeDetectorRef,
    private activatedRouter: ActivatedRoute) {
      this.activatedRouter.params.subscribe(parametros=>{
        this.key=parametros['key'];
        (async ()=>{
          try {
            let result = await this.proveedoresService.getProveedores();
            this.proveedor=result.values;
  
          } catch (error) {
            
          }
          this.proveedor=await this.proveedoresService.getProveedor(this.key);
          this.cdref.detectChanges();
      })();
    })
     }

  ngOnInit(): void {
    this.proveedorForm = this.pf.group({
      nombre: ['', Validators.required ],
      cif: ['', Validators.required ],
      direccion: ['', [ Validators.required, Validators.minLength(10)] ],
      cp: ['', Validators.required ],
      localidad: ['', Validators.required ],
      provincia: ['',Validators.required] ,
      telefono: ['',Validators.required],
      email: ['', Validators.required],
      contacto: ['', Validators.required]
      });

  }

  onSubmit() {
    this.proveedor = this.saveProveedor();
    this.proveedoresService.putProveedor(this.proveedor,this.key);
  
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
      contacto: this.proveedorForm.get('contacto')?.value
      };
      return saveProveedor;

      }

      updateProveedor(){
        this.proveedor = this.saveProveedor();
        this.proveedoresService.putProveedor(this.proveedor,this.key);
        console.log(this.proveedor);
        this.router.navigate(['/proveedores']);
      }

}
