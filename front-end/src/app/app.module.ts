import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { 
  MatFormFieldModule, 
  MatInputModule, 
  MatIconModule, 
  MatButtonModule,
  MatCheckboxModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AppRouting } from './routes/routing';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { ListComponent } from './components/list/list.component';
import { NuevaFotografiaComponent } from './components/nueva-fotografia/nueva-fotografia.component';
import { EditarFotografiaComponent } from './components/editar-fotografia/editar-fotografia.component';
import { FotografiaComponent } from './components/fotografia/fotografia.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AdminComponent,
    ListComponent,
    NuevaFotografiaComponent,
    EditarFotografiaComponent,
    FotografiaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    AppRouting,
    HttpModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
