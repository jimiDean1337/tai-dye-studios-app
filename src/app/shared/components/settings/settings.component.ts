import { Component, OnInit, Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of, OperatorFunction } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from "../../services/product.service";
import { Product } from "../../classes/product";
import { catchError, debounceTime, distinctUntilChanged, map, reduce, switchMap, tap } from 'rxjs/operators';
import { PreviewsComponent } from '@ks89/angular-modal-gallery/lib/components/previews/previews.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public products: Product[] = [];
  public search: boolean = false;

  /* TODO: Add Spanish to available translations */
  public languages = [{
    name: 'English',
    code: 'en'
  }, {
    name: 'French',
    code: 'fr'
  }];

  public currencies = [
    {
      name: 'Euro',
      currency: 'EUR',
      price: 0.82 // price of euro
    },
    {
      name: 'Pound',
      currency: 'GBP',
      price: 0.71 // price of euro
    },
    {
      name: 'Dollar',
      currency: 'USD',
      price: 1 // price of usd
    },
    {
      name: 'Peso',
      currency: 'MXN',
      price: 20.02 // price of mxn
    }
  ];

  searchQuery: any;
  public searchResults: Observable<any>;
  public searching = false;
  public searchFailed = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private translate: TranslateService,
    private router: Router,
    public productService: ProductService) {
    this.productService.cartItems.subscribe(response => this.products = response);
  }

  ngOnInit(): void {
  }

  searchToggle(){
    this.search = !this.search;
  }

  selectResult(item: any) {
    const url = String(item.item.title).replace(' ','-')
    console.log(url)
    this.router.navigate(['/shop/product/', url]).then(() => this.searchToggle())
  }

  // TODO: Refactor Search for more depth
  public Search: OperatorFunction<any, any> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.productService.searchProducts(term).pipe(
          tap(() => this.searchFailed = false),
          map(items => items.map(product => ({ title: product.title, imgSrc: product.images[0].src }))),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )

  searchProducts(query: any) {
    console.log('Search',query)
  //  this.searchResults = this.productService.searchProducts(query)
  }

  changeLanguage(code){
    if (isPlatformBrowser(this.platformId)) {
      this.translate.use(code)
    }
  }

  get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }

  removeItem(product: any) {
    this.productService.removeCartItem(product);
  }

  changeCurrency(currency: any) {
    this.productService.Currency = currency
  }

}

