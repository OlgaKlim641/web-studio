import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleService} from "../../../shared/services/article.service";
import {ArticleType} from "../../../../types/article.type";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  protected article!: ArticleType;
  protected articles: ArticleType[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private articleService: ArticleService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(params => {
        this.articleService.getArticle(params['url'])
          .subscribe((data: ArticleType) => {
            this.article = data;
            if (this.article) {
              this.articleService.getArticleRelated(this.article.url)
                .subscribe((articles: ArticleType[]) => {
                  this.articles = articles;
                })
            }
          })
      })
  }
  protected getSafeHtml(): SafeHtml {
    if (this.article && this.article.text) {
      return this.sanitizer.bypassSecurityTrustHtml(this.article.text);
    }
    return this.sanitizer.bypassSecurityTrustHtml('');
  }
}
