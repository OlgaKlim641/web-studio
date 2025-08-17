import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PolicyPageComponent} from "./policy-page/policy-page.component";


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    PolicyPageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
