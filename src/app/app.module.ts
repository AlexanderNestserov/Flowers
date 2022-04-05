import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CarouselModule } from 'primeng/carousel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from './utility/app.init';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    ButtonModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    // KeycloakAngularModule
  ],
  bootstrap: [AppComponent],
  //providers: [{
  //provide: APP_INITIALIZER,
  // useFactory: initializeKeycloak,
  //multi: true,
  // deps: [KeycloakService]
  // }]
})
export class AppModule { }
