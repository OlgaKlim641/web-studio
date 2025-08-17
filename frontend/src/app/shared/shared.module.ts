import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ArticleCardComponent} from "./components/article-card/article-card.component";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TruncateTextPipe} from "./unit/truncate-text.pipe";
import { LoaderComponent } from './components/loader/loader.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { CommentComponent } from './components/comment/comment.component';





@NgModule({
  declarations: [
    ArticleCardComponent,
    TruncateTextPipe,
    LoaderComponent,
    CommentComponent],

  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    FormsModule
  ],
  exports: [
    ArticleCardComponent,
    TruncateTextPipe,
    CommentComponent,
    LoaderComponent]
})
export class SharedModule { }
