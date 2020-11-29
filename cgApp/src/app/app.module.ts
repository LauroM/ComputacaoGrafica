import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RenderComponent } from './render/render.component';
import {ButtonModule} from 'primeng/button';
import {SelectButtonModule} from 'primeng/selectbutton';
import { FormsModule }   from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    RenderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    SelectButtonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
