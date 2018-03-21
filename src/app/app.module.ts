import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SecureAadhaarApiService } from './services/secure-aadhaar-api.service';
import { LoginComponent } from './login.component';
import { HomeComponent } from './home.component';
import { CookieService } from 'ngx-cookie-service';
import { RedirectComponent } from './redirect.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RedirectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
  ],
  providers: [SecureAadhaarApiService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
