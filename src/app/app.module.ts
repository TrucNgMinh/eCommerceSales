import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeUserComponent } from './components/home-user/home-user.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomeAdminComponent,
    HomeUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
