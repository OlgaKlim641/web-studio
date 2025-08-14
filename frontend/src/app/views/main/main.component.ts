import {Component, OnInit} from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {ArticleService} from "../../shared/services/article.service";
import {ArticleType} from "../../../types/article.type";
import {STOCKS, REVIEWS, SERVICES} from '../../constants';
import {MatDialog} from "@angular/material/dialog";
import {OrderService} from "../../shared/services/order.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: false
  }
  customOptionsReviews: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    margin: 26,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      }
    },
    nav: false
  }
  stocks = STOCKS
  reviews = REVIEWS
  services = SERVICES


  articlesPopular: ArticleType[] = [];

  constructor(private articleService: ArticleService,
              private dialog: MatDialog,
              private orderService: OrderService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.articleService.getArticlePopular()
      .subscribe((data: ArticleType[]) => {
        this.articlesPopular = data;
      })
  }

  protected serviceOrder(id: number, name: string) {
    this.orderService.openOrderPopup(id, name);
  }


}
