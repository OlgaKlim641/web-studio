import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-policy-page',
  templateUrl: './policy-page.component.html',
  styleUrls: ['./policy-page.component.scss']
})
export class PolicyPageComponent implements OnInit {
  protected currentDate = new Date().toLocaleDateString('ru-RU');
  constructor() { }

  ngOnInit(): void {
  }

}
