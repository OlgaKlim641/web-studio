import {Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {ArticleService} from "../../shared/services/article.service";
import {ArticleType} from "../../../types/article.type";
import {STOCKS, REVIEWS, SERVICES} from '../../constants';
import { Subscription } from 'rxjs';
import {PopupService} from "../../shared/services/popup.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {RequestEnumType} from "../../../types/request.type";



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
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
  stocks = STOCKS;
  reviews = REVIEWS;
  services = SERVICES;
  thanksTitle = 'Спасибо за вашу заявку!';
  thanksText = 'Мы свяжемся с вами при первой же возможности.';
  orderForm: FormGroup;
  articlesPopular: ArticleType[] = [];
  showOrder = false;
  showThankYou = false;
  errorMessage = '';

  private subs = new Subscription();


  constructor(private fb: FormBuilder,
              private articleService: ArticleService,
              private popupService: PopupService) {

    this.orderForm = this.fb.group({
      service: ['', [Validators.required]],
      name: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$')]],
    });

  }

  ngOnInit(): void {
    this.articleService.getArticlePopular()
      .subscribe((data: ArticleType[]) => {
        this.articlesPopular = data;
      });

    this.subs.add(this.popupService.showOrderPopup$.subscribe(show => this.showOrder = show));
    this.subs.add(this.popupService.showThankYouPopup$.subscribe(show => this.showThankYou = show));
  }


  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  closePopup(): void {
    this.popupService.closeAll();
  }

  serviceOrder(): void {
    if (this.orderForm.valid) {
      const request = {
        service: String(this.orderForm.value.service),
        name: this.orderForm.value.name,
        phone: this.orderForm.value.phone,
        type: RequestEnumType.order,
      }
      this.popupService.addRequest(request)
        .subscribe((response) => {
          if (!response.error) {
            this.orderForm.reset();
            this.showThankYou = true;  // показываем попап благодарности
            this.popupService.closeOrderPopup(); // если нужно закрыть форму заявки
          } else {
            this.thanksTitle = 'Что то пошло не так!';
            this.thanksText = 'Свяжитесь с нами по телефону +7 (499) 343-13-34';
            this.showThankYou = true;  // также показываем попап с ошибкой
            this.popupService.openThankYouPopup();
          }
        });
    } else {
      this.orderForm.markAllAsTouched();
    }
  }

  openOrderPopup(serviceId?: number, serviceName?: string): void {
    if(serviceId) {
      this.orderForm.patchValue({ service: serviceId });
    }
    this.popupService.openOrderPopup();
  }


}
