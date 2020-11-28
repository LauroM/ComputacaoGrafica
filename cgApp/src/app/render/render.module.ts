import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RenderComponent } from './render.component';
import {SelectButtonModule} from 'primeng/selectbutton';


@NgModule({
  declarations: [
    RenderComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    SelectButtonModule
  ]
})
export class RenderModule { }
