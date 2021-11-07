import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { InisesComponent } from './autentication/inises/inises.component';
import { RegistroComponent } from './autentication/registro/registro.component';
import { AddproveeComponent } from './pages/addprovee/addprovee.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { AddpresComponent } from './pages/presupuesto/addpres/addpres.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { EditpresComponent } from './presupuesto/editpres/editpres.component';
import { PresupuestosComponent } from './presupuesto/presupuestos/presupuestos.component';
import { GuardService } from './guard.service';
import { EditproveeComponent } from './pages/proveedores/editprovee/editprovee.component';

const routes: Routes = [

  {path:'', redirectTo:'/login', pathMatch:'full'},
  {path:'login', component:InicioComponent},
  {path:'proveedores', component:ProveedoresComponent,canActivate:[GuardService]},
  {path:'addprovee', component:AddproveeComponent,canActivate:[GuardService]},
  {path:'addpres', component:AddpresComponent,canActivate:[GuardService]},
  {path:'presupuestos', component:PresupuestosComponent,canActivate:[GuardService]},
  { path: 'editpres/:key', component: EditpresComponent,canActivate:[GuardService] },
  { path: 'iniciosesion', component: InisesComponent,canActivate:[GuardService] },
  { path: 'registro', component: RegistroComponent},
  {path:'editprovee/:key', component:EditproveeComponent,canActivate:[GuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
