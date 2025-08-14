import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../services/order.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private orderService: OrderService,
              private dialog: MatDialog ) { }

  ngOnInit(): void {
  }

 activePopup() {
    this.orderService.openPopupConsultation();

  }
}
