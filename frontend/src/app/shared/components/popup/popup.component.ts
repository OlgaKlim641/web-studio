// import {Component, Inject, OnInit} from '@angular/core';
// import {FormBuilder, FormGroup, Validators} from "@angular/forms";
// import {CategoryType} from "../../../../types/category.type";
// import {CategoryService} from "../../services/category.service";
// import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
// import {OrderService} from "../../services/order.service";
// import {RequestEnumType} from "../../../../types/request.type";
// import {SERVICES} from '../../../constants';
//
// @Component({
//   selector: 'popup',
//   templateUrl: './popup.component.html',
//   styleUrls: ['./popup.component.scss']
// })
// export class PopupComponent implements OnInit {
//   services = SERVICES
//

//
//
//   showThankYou = false;
//   showOrder = false;
//   showConsultation = false;
//   errorMessage = '';
//
//   constructor(private fb: FormBuilder,
//               private categoryService: CategoryService,
//               protected orderService: OrderService,
//               private dialog: MatDialogRef<PopupComponent>,
//               @Inject(MAT_DIALOG_DATA) public data: { serviceName: string }
//   ) {
//
//
//
//   }
//
//   categories: CategoryType[] = [];
//
//   ngOnInit(): void {
//
//   }
//
//   closePopup(): void {
//     if (this.orderForm.valid && this.orderForm.value.servce
//       && this.orderForm.value.name && this.orderForm.value.phone) {
//       this.showThankYou = false;
//       this.orderForm.reset();
//       this.errorMessage = '';
//     }
//   }
//
//   serviceOrder() {
//     if (this.orderForm.valid) {
//       const request = {
//         service: this.orderForm.value.service,
//         name: this.orderForm.value.name,
//         phone: this.orderForm.value.phone,
//         type: RequestEnumType.order,
//       }
//
//       this.orderService.addRequest(request)
//         .subscribe((response) => {
//           if (!response.error) {
//             this.orderForm.reset();
//             this.orderService.thanksPopup();
//           } else {
//             // this.thanksTitle = 'Что то пошло не так!';
//             // this.thanksText = 'Свяжитесь с нами по телефону +7 (499) 343-13-34';
//             this.orderService.thanksPopup();
//           }
//         });
//     }
//   }
//
//
// }
