import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Order } from '../../../shared/classes/order';
import { OrderService } from '../../../shared/services/order.service';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit, AfterViewInit{

  public orderDetails: Order = {};

  constructor(public title: Title, public productService: ProductService,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.title.setTitle('Order Success - Tai-Dye Studios | Creative Apparel &amp; Accessories');
    this.orderService.checkoutItems.subscribe(response => {
      this.orderDetails = response;
      // response.totalAmount.subscribe(res => console.log(res))
    });
  }

  ngAfterViewInit() {

  }

}
