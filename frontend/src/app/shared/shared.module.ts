import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ArticleCardComponent} from "./conponents/article-card/article-card.component";
import {RouterModule} from "@angular/router";
import {PopupComponent} from "./conponents/popup/popup.component";
import {ReactiveFormsModule} from "@angular/forms";
import {TruncateTextPipe} from "./unit/truncate-text.pipe";





@NgModule({
  declarations: [ArticleCardComponent, PopupComponent, TruncateTextPipe],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [ArticleCardComponent, PopupComponent]
})
export class SharedModule { }
