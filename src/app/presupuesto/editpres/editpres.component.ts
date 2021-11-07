import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PresupuestosService } from 'src/app/servicios/presupuestos.service';
import { PresupuestosComponent } from '../presupuestos/presupuestos.component';

@Component({
  selector: 'app-editpres',
  templateUrl: './editpres.component.html',
  styleUrls: ['./editpres.component.css']
})
export class EditpresComponent implements OnInit {

  presupuestoForm!: FormGroup;
 presupuesto: any;
 base: any;
 tipo: any;
 iva: any = 0;
 total: any = 0;
 key!: string;

  constructor(private pf: FormBuilder,
    private presupuestoService: PresupuestosService,
    private router:Router,
    private cdref:ChangeDetectorRef,
    private activatedRouter: ActivatedRoute) { 
      this.activatedRouter.params.subscribe(parametros=>{
        this.key=parametros['key'];
        (async ()=>{
          try {
            let result = await this.presupuestoService.getPresupuestos();
            this.presupuesto=result.values
  
          } catch (error) {
            
          }
          this.presupuesto=await this.presupuestoService.getPresupuesto(this.key);
          this.cdref.detectChanges();
      })();
    })
    }
//en el servicio


  ngOnInit(): void {
    this.presupuestoForm = this.pf.group({
      proveedor: ['', Validators.required ],
      fecha: ['', Validators.required ],
      concepto: ['', [ Validators.required, Validators.minLength(10)] ],
      base: ['', Validators.required ],
      tipo: ['', Validators.required ],
      iva: this.iva ,
      total: this.total
      });
      this.onChanges();
    }
    
    onChanges(): void {
      this.presupuestoForm.valueChanges.subscribe(valor => {
      this.base = valor.base;
      this.tipo = valor.tipo;
      this.presupuestoForm.value.iva = this.base * this.tipo;
      this.presupuestoForm.value.total = this.base + (this.base * this.tipo);
      });
    }


    onSubmit() {
      this.presupuesto = this.savePresupuesto();
      this.presupuestoService.putPresupuesto(this.presupuesto,this.key);
    
      }
      
      savePresupuesto() {
      const savePresupuesto = {
      proveedor: this.presupuestoForm.get('proveedor')?.value,
      fecha: this.presupuestoForm.get('fecha')?.value,
      concepto: this.presupuestoForm.get('concepto')?.value,
      base: this.presupuestoForm.get('base')?.value,
      tipo: this.presupuestoForm.get('tipo')?.value,
      iva: this.presupuestoForm.get('iva')?.value,
      total: this.presupuestoForm.get('total')?.value
      };
      return savePresupuesto;

      }

      updatePresupuesto(){
        this.presupuesto = this.savePresupuesto();
        this.presupuestoService.putPresupuesto(this.presupuesto,this.key);
        console.log(this.presupuesto);
        this.router.navigate(['/presupuestos']);
      }
    
      /*setPresupuesto(){
        this.presupuestoForm = this.pf.group({
          proveedor: [this.presupuesto?.proveedor, [Validators.required,Validators.minLength(4)]],
          fecha: [this.presupuesto?.fecha, Validators.required],
          concepto: [this.presupuesto?.concepto, [Validators.required, Validators.minLength(10)]],
          base: [this.presupuesto?.base, [Validators.required,Validators.min(0)]],
          tipo: [this.presupuesto?.tipo, Validators.required],
          iva: [{value:this.iva, disabled: true}],
          total: [{value:this.total, disabled: true}]
        });
        this.onChanges();
        
        //para que Angular detecte los cambios en las variables y no de error NG0100: ExpressionChangedAfterItHasBeenCheckedError

      }*/
      

}
