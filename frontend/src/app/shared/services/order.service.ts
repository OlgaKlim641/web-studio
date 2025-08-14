import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {DefaultResponseType} from "../../../types/default-response.type";
import {environment} from "../../../environments/environment";
import {RequestType} from "../../../types/request.type";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private _activeService = new BehaviorSubject<{ id: number, name: string } | null>(null);

  public isPopupActive$ = new BehaviorSubject<boolean>(false);
  public consultationPopup$ = new BehaviorSubject<boolean>(false);
  public orderPopup$ = new BehaviorSubject<boolean>(false);
  public isThanksPopup$ = new BehaviorSubject<boolean>(false);

  get activeService() {
    return this._activeService.asObservable();
  }

  constructor(private http: HttpClient) { }
  public openConsultationPopup() {
    this.isPopupActive$.next(true);
    this.consultationPopup$.next(true);
  }

  public closePopup() {
    this.isPopupActive$.next(false);
    this.consultationPopup$.next(false);
    this.orderPopup$.next(false);
    this.isThanksPopup$.next(false);

  }

  public thanksPopup() {
    this.isPopupActive$.next(true);
    this.consultationPopup$.next(false);
    this.orderPopup$.next(false);
    this.isThanksPopup$.next(true);

  }

  public openOrderPopup(id: number, name: string) {
    const service = {id: id, name: name}
    this._activeService.next(service);
    this.isPopupActive$.next(true);
    this.orderPopup$.next(true);
  }

  public openPopupConsultation():void {
    this.isPopupActive$.next(true);
    this.consultationPopup$.next(true);
  }

  public addRequest(request: RequestType): Observable<DefaultResponseType> {
      return this.http.post<DefaultResponseType>(environment.api + 'requests', request);
    }

}
