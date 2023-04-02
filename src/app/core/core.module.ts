import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendService } from './services';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
  ],
  providers: [
    BackendService
  ]
})
export class CoreModule { }
