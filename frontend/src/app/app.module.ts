import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common'

import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up.component';
import { SignInComponent } from './sign-in.component';
import { AppRoutingModule } from './app-routing.module';
import { UserService } from './user.service';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [
    UserService,
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
