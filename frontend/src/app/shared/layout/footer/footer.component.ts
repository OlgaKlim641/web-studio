import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RequestEnumType} from "../../../../types/request.type";
import {Subscription} from "rxjs";
import {PopupService} from "../../services/popup.service";


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  thanksTitle = 'Спасибо за вашу заявку!';
  thanksText = 'Мы свяжемся с вами при первой же возможности.';
  protected orderFormConsultation: FormGroup;
  showConsultation = false;
  showThankYou = false;

  private subs = new Subscription();

  constructor(private fb: FormBuilder,
              private popupService: PopupService) {

    this.orderFormConsultation = this.fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$')]],
    })
  }

  ngOnInit(): void {
    this.subs.add(this.popupService.showConsultationPopup$.subscribe(show => this.showConsultation = show));
    this.subs.add(this.popupService.showThankYouPopup$.subscribe(show => this.showThankYou = show));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  closePopup(): void {
    this.popupService.closeAll();
  }

  serviceOrder(): void {
    if (this.orderFormConsultation.valid) {
      const request = {
        name: this.orderFormConsultation.value.name,
        phone: this.orderFormConsultation.value.phone,
        type: RequestEnumType.consultation,
      }
      this.popupService.addRequest(request)
        .subscribe((response) => {
          if (!response.error) {
            this.orderFormConsultation.reset();
            this.showThankYou = true;  // показываем попап благодарности
            this.popupService.closeConsultationPopup(); // если нужно закрыть форму заявки
          } else {
            this.thanksTitle = 'Что то пошло не так!';
            this.thanksText = 'Свяжитесь с нами по телефону +7 (499) 343-13-34';
            this.showThankYou = true;  // также показываем попап с ошибкой
            this.popupService.openThankYouPopup();
          }
        });
    } else {
      this.orderFormConsultation.markAllAsTouched();
    }
  }

  openConsultationPopup() {
    this.popupService.openConsultationPopup();

  }
}
