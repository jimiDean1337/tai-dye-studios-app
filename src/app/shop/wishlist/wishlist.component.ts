import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from "../../shared/services/product.service";
import { Product } from "../../shared/classes/product";
import { Title } from '@angular/platform-browser';
import { QuickViewComponent } from 'src/app/shared/components/modal/quick-view/quick-view.component';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  @ViewChild('quickView') ViewProduct: QuickViewComponent;
  public products: Product[] = [];

  public selectedProduct: Product = {};

  constructor(private router: Router,
    public title: Title,
    public productService: ProductService) {
    this.productService.wishlistItems.subscribe(response => this.products = response);
  }

  ngOnInit(): void {
    this.title.setTitle('Wishlist - Tai-Dye Studios | Creative Clothing &amp; Accessories')
  }

  viewProduct(product: any) {
    this.ViewProduct = product;
    this.ViewProduct.openModal()
  }

  async addToCart(product: any) {
    const status = await this.productService.addToCart(product);
    if(status) {
      this.router.navigate(['/shop/cart']);
      this.removeItem(product);
    }
  }

  removeItem(product: any) {
    this.productService.removeWishlistItem(product);
  }

}
