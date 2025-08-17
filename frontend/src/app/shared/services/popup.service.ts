import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {RequestType} from "../../../types/request.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private http: HttpClient) { }

  private showOrderPopupSubject = new BehaviorSubject<boolean>(false);
  private showThankYouPopupSubject = new BehaviorSubject<boolean>(false);
  private showConsultationPopupSubject = new BehaviorSubject<boolean>(false);

  // observable для подписки в компонентах
  showOrderPopup$ = this.showOrderPopupSubject.asObservable();
  showThankYouPopup$ = this.showThankYouPopupSubject.asObservable();
  showConsultationPopup$ = this.showConsultationPopupSubject.asObservable();

  openOrderPopup(): void {
    this.showOrderPopupSubject.next(true);
    this.showThankYouPopupSubject.next(false);
  }

  openConsultationPopup(): void {
    this.showConsultationPopupSubject.next(true);
    this.showThankYouPopupSubject.next(false);
  }

  closeOrderPopup(): void {
    this.showOrderPopupSubject.next(false);
  }
  closeConsultationPopup(): void {
    this.showConsultationPopupSubject.next(false);
  }

  openThankYouPopup(): void {
    this.showThankYouPopupSubject.next(true);
    this.showOrderPopupSubject.next(false);
  }

  closeThankYouPopup(): void {
    this.showThankYouPopupSubject.next(false);
  }

  closeAll(): void {
    this.showOrderPopupSubject.next(false);
    this.showThankYouPopupSubject.next(false);
    this.showConsultationPopupSubject.next(false);
  }

  public addRequest(request: RequestType): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'requests', request);
  }
}
