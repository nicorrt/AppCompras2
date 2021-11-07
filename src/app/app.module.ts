import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './commons/header/header.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { AddproveeComponent } from './pages/addprovee/addprovee.component';
import { ProveedoresService } from './servicios/proveedores.service';
import { InicioComponent } from './pages/inicio/inicio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddpresComponent } from './pages/presupuesto/addpres/addpres.component';
//import { HttpClientModule } from '@angular/common/http';
import { PresupuestosService } from './servicios/presupuestos.service';

import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { PresupuestosComponent } from './presupuesto/presupuestos/presupuestos.component';
import { EditpresComponent } from './presupuesto/editpres/editpres.component';
import { RegistroComponent } from './autentication/registro/registro.component';
import { AutenticationService } from './servicios/autentication.service';
import { InisesComponent } from './autentication/inises/inises.component';
import { EditproveeComponent } from './pages/proveedores/editprovee/editprovee.component';
import { GuardService } from './guard.service';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProveedoresComponent,
    AddproveeComponent,
    InicioComponent,
    AddpresComponent,
    PresupuestosComponent,
    EditpresComponent,
    RegistroComponent,
    InisesComponent,
    EditproveeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
   // HttpClientModule
   AngularFireAuthModule,
   AngularFirestoreModule,
   AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [ProveedoresService,PresupuestosService,PresupuestosService,AngularFireAuth,AngularFirestore,AutenticationService,GuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
