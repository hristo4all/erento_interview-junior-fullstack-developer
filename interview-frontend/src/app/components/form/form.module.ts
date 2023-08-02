import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule,MatPaginator} from '@angular/material/paginator';
import {NgIf} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    MatInputModule,
    MatPaginatorModule,
    NgIf,
    BrowserAnimationsModule
  ],
  providers: [HttpClientModule,HttpClient,]
})
export class FormModule { }
