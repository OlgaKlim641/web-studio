
import {Component, Input, OnInit} from '@angular/core';
import {ArticleType} from "../../../../types/article.type";
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnInit {

  @Input() article!: ArticleType;

  protected serverStaticPath: string = environment.serverStaticPath;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  protected navigate(url: string) {
    this.router.navigate(['article/' + url])
  }
}
