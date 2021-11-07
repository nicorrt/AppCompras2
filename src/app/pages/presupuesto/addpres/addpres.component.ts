import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms'
import { PresupuestosService } from 'src/app/servicios/presupuestos.service';
import {AngularFireDatabase} from '@angular/fire/compat/database';

@Component({
  selector: 'app-addpres',
  templateUrl: './addpres.component.html',
  styleUrls: ['./addpres.component.css']
})
export class AddpresComponent implements OnInit {

  presupuestoForm!: FormGroup;
  key!: string;
  presupuesto: any;
  base: any;
  tipo: any;
  iva: any = 0;
  total: any = 0;
  
  constructor(private pf:FormBuilder, private presupuestoService: PresupuestosService, private db:AngularFireDatabase) { }

  ngOnInit():void {

    if(this.presupuesto==null){
    this.presupuestoForm = this.pf.group({
      proveedor: ['', Validators.required ],
      fecha: ['', Validators.required ],
      cif: ['', Validators.required ],
      concepto: ['', [ Validators.required, Validators.minLength(5)]],
      base: ['', Validators.required ],
      tipo: ['', Validators.required ],
      iva: this.iva , 
      total: this.total
      });
      this.onChanges();
    }else{
      this.refreshFormulario();
    }
  }

  onSubmit() {
    this.presupuesto = this.savePresupuesto();
    /*this.presupuestoService.postPresupuesto( this.presupuesto )
    .subscribe(newpres => {
    })*/

    }

    refreshFormulario(){
      this.presupuesto=this.presupuestoForm.setValue(this.presupuesto);
    }

    onChanges():void{
    this.presupuestoForm.valueChanges.subscribe(valor => { 
      this.base = valor.base; 
      this.tipo = valor.tipo;
      this.presupuestoForm.value.iva = this.base * this.tipo; 
      this.presupuestoForm.value.total = this.base + (this.base * this.tipo);
      });
      }

    savePresupuesto() {
      const savePresupuesto = {
      proveedor: this.presupuestoForm.get('proveedor')?.value,
      fecha: this. presupuestoForm.get('fecha')?.value,
      concepto: this.presupuestoForm.get('concepto')?.value,
      base: this.presupuestoForm.get('base')?.value,
      tipo: this.presupuestoForm.get('tipo')?.value,
      iva: this.presupuestoForm.get('iva')?.value,
      total: this.presupuestoForm.get('total')?.value,
      };
      this.presupuestoService.addpress(savePresupuesto);
      this.presupuestoForm.reset();
      return savePresupuesto;
      }

}
