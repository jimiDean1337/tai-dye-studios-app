import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from "../../shared/services/product.service";
import { Product } from "../../shared/classes/product";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {

  public products: Product[] = [];

  constructor(private router: Router,
    public title: Title,
    public productService: ProductService) {
    this.productService.compareItems.subscribe(response => this.products = response);
  }

  ngOnInit(): void {
    this.title.setTitle('Compare - Tai-Dye Studios | Creative Clothing &amp; Accessories')
  }

  async addToCart(product: any) {
    const status = await this.productService.addToCart(product);
    if(status) {
      this.router.navigate(['/shop/cart']);
    }
  }

  removeItem(product: any) {
    this.productService.removeCompareItem(product);
  }

}
