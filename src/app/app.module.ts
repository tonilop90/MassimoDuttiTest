import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { PrincipalModule } from './components/principal/principal.module';
import { AuthModule } from './components/auth/auth.module';
// Services 
import { AuthGuardService } from './guards/authGuard';
// Components
import { AppComponent } from './app.component';
import { PrincipalComponent } from './components/principal/principal.component';
// Store & Reducers 
import { StoreModule } from '@ngrx/store';
import { shipReducer } from './reducers/ships.reducer';


@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrincipalModule,
    AuthModule,
    StoreModule.forRoot({ship: shipReducer})
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
