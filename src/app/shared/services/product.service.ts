import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, startWith, delay, mapTo } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../classes/product';
import { AngularFireDatabase } from '@angular/fire/database';
import { Coupon } from '../classes/coupon';
import { CouponService } from './coupon.service';
import { environment } from 'src/environments/environment';

const state = {
  products: JSON.parse(localStorage['products'] || '[]'),
  wishlist: JSON.parse(localStorage['wishlistItems'] || '[]'),
  compare: JSON.parse(localStorage['compareItems'] || '[]'),
  cart: JSON.parse(localStorage['cartItems'] || '[]'),
  localPickup: JSON.parse(localStorage['localPickup'] || 'false')
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public Currency = { name: 'Dollar', currency: 'USD', price: 1 } // Default Currency
  public OpenCart: boolean = false;
  public Products: Observable<Product[]>;
  public Coupon: Coupon | null;
  public CartQuantity: number = 0;
  CouponInvalid: BehaviorSubject<boolean>;

  constructor(private http: HttpClient,
    private db: AngularFireDatabase,
    private toastrService: ToastrService,
    private couponService: CouponService) {
    this.CouponInvalid = new BehaviorSubject(false);
  }

  /*
    ---------------------------------------------
    ---------------  Product  -------------------
    ---------------------------------------------
  */

  // Product
  private get products(): Observable<Product[]> {
    if (environment.production) {
      /* Get Products from Firebase RT Database */
      this.Products = this.db.list<Product>('products').valueChanges();
    } else if (!environment.production) {
      this.Products = this.http.get<Product[]>('assets/data/shop-products.json').pipe(map(data => data));
    }
    this.Products.subscribe(next => { localStorage['products'] = JSON.stringify(next) });
    return this.Products = this.Products.pipe(startWith(JSON.parse(localStorage['products'] || '[]')));
  }

  // Get Products
  public get getProducts(): Observable<Product[]> {
    return this.products;
  }

  // Get Products By Slug
  public getProductBySlug(slug: string): Observable<Product> {
    return this.products.pipe(map(items => {
      return items.find((item: any) => {
        return item.title.replace(' ', '-') === slug;
      });
    }));
  }


  /*
    ---------------------------------------------
    ---------------  Wish List  -----------------
    ---------------------------------------------
  */

  // Get Wishlist Items
  public get wishlistItems(): Observable<Product[]> {
    const itemsStream: Observable<any[]> = new Observable(observer => {
      observer.next(state.wishlist);
      observer.complete();
    });
    return <Observable<Product[]>>itemsStream;
  }

  // Add to Wishlist
  public addToWishlist(product): any {
    const wishlistItem = state.wishlist.find(item => item.id === product.id)
    if (!wishlistItem) {
      state.wishlist.push({
        ...product
      })
    }
    this.toastrService.success('Product has been added in wishlist.');
    localStorage.setItem("wishlistItems", JSON.stringify(state.wishlist));
    return true
  }

  // Remove Wishlist items
  public removeWishlistItem(product: Product): any {
    const index = state.wishlist.indexOf(product);
    state.wishlist.splice(index, 1);
    localStorage.setItem("wishlistItems", JSON.stringify(state.wishlist));
    return true
  }

  /*
    ---------------------------------------------
    -------------  Compare Product  -------------
    ---------------------------------------------
  */

  // Get Compare Items
  public get compareItems(): Observable<Product[]> {
    const itemsStream = new Observable(observer => {
      observer.next(state.compare);
      observer.complete();
    });
    return <Observable<Product[]>>itemsStream;
  }

  // Add to Compare
  public addToCompare(product): any {
    const compareItem = state.compare.find(item => item.id === product.id)
    if (!compareItem) {
      state.compare.push({
        ...product
      })
    }
    this.toastrService.success('Product has been added in compare.');
    localStorage.setItem("compareItems", JSON.stringify(state.compare));
    return true
  }

  // Remove Compare items
  public removeCompareItem(product: Product): any {
    const index = state.compare.indexOf(product);
    state.compare.splice(index, 1);
    localStorage.setItem("compareItems", JSON.stringify(state.compare));
    return true
  }

  /*
    ---------------------------------------------
    -----------------  Cart  --------------------
    ---------------------------------------------
  */

  // Get Cart Items
  public get cartItems(): Observable<Product[]> {
    return new Observable(observer => {
      observer.next(state.cart);
      observer.complete();
    });
  }

  // Add to Cart
  public addToCart(product: Product): any {
    const cartItem = state.cart.find(item => item.sku === product.sku);
    const qty = product.quantity ? product.quantity : 1;
    const items = cartItem ? cartItem: product;
    const stock = this.calculateStockCounts(items, qty);
    // const selectedSku = this.selectVariant()
    if(!stock) return false

    if (cartItem) {
      cartItem.quantity += qty
    } else {
      state.cart.push({
        ...product,
        quantity: qty
      })
      this.CartQuantity += qty;
    }

    this.OpenCart = true; // If we use cart variation modal
    localStorage.setItem("cartItems", JSON.stringify(state.cart));
    return true;
  }

  // Find selected variant by size
  getSelectedVariant(product: Product, size: string) {
    return product.variants.find((variant, index) => {
      if (variant.size === size) {
        return variant.sku;
      }
    })
  }

  // Update Cart Quantity
  public updateCartQuantity(product: Product, quantity: number): Product | boolean {
    return state.cart.find((items, index) => {
      if (items.id === product.id) {
        const qty = state.cart[index].quantity + quantity
        const stock = this.calculateStockCounts(state.cart[index], quantity)
        if (qty !== 0 && stock) {
          state.cart[index].quantity = qty
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cart));
        return true
      }
    })
  }

    // Calculate Stock Counts
  public calculateStockCounts(product, quantity) {
    const qty = product.quantity + quantity
    const stock = product.stock
    if (stock < qty || stock == 0) {
      this.toastrService.error('You can not add more items than available. In stock: '+ stock +' items.');
      return false
    }
    return true
  }

  // Remove Cart items
  public removeCartItem(product: Product): any {
    this.CartQuantity -= product.quantity;
    const index = state.cart.indexOf(product);
    state.cart.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(state.cart));
    return true
  }

  // Total sales tax
  public cartSalesTax(): Observable<number> {
    return this.cartItems.pipe(map((product: Product[]) => {
      return product.reduce((prev, curr: Product) => {
        let price = curr.price;
        curr.salesTax = +Number(price * 0.0575).toFixed(2);
        return (prev + curr.salesTax * curr.quantity) * this.Currency.price;
      }, 0)
    }))
  }

  public cartShippingTotal(): Observable<number> {
    return this.cartItems.pipe(map((products: Product[]) => {
      let localPickup = JSON.parse(localStorage['localPickup'] || 'false');
      let subTotal = JSON.parse(localStorage['subTotal'] || '0')
      if (subTotal > 100 || localPickup || (this.Coupon && this.Coupon.code === 'FREESHIP')) {
        return products.reduce((prev, curr: Product) => {
          curr.shipping = 0;
          return (prev + curr.shipping) * this.Currency.price;
        }, 0)
      } else {
        return (2.50 * this.Currency.price) + products.reduce((prev, curr: Product) => {
          curr.shipping = curr.quantity * 2.5;
          return (prev + curr.shipping) * this.Currency.price;
        }, 0)
      }
    }))
  }

  // Total amount
  public cartTotalAmount(): Observable<number> {
    return this.cartItems.pipe(map((product: Product[]) => {
      return product.reduce((prev, curr: Product) => {
        let price = curr.price;
        this.coupon.subscribe(coupon => {
          if (coupon) {
            if (coupon.type === 'CASH' || coupon.type === 'PERCENTAGE') {
              price = this.couponService.applyCoupon(price, this.Coupon.type, this.Coupon.discount);
            }
          }
        })
        return (prev + price * curr.quantity) * this.Currency.price;
      }, 0);
    }));
  }

  /*
    ---------------------------------------------
    ------------  Coupon  ---------------
    ---------------------------------------------
  */

  public get coupon(): Observable<Coupon> {
    return new Observable(observer => {
      observer.next(this.Coupon);
      observer.complete();
    })
  }

  public addCoupon(couponCode: string) {
    this.couponService.validateCoupon(couponCode).subscribe(results => {
      // console.log('Validation result: ', results)
      if (results.length) {
        localStorage.setItem('coupon', results[0].code)
        this.CouponInvalid.next(false);
        this.Coupon = results[0];
      } else {
        this.CouponInvalid.next(true);
      }
    });
  }

  public removeCoupon() {
    localStorage.removeItem('coupon')
    this.Coupon = null;
  }

  /*
    ---------------------------------------------
    ------------  Search Product  ---------------
    ---------------------------------------------
  */

  public searchProducts(query: string): Observable<Product[]> {
    console.log('Searching', query)
    return this.getProducts.pipe(map(product =>
      product.filter((item: Product) => item.title.includes(query))
    ))
  }

  /*
    ---------------------------------------------
    ------------  Filter Product  ---------------
    ---------------------------------------------
  */

  // Get Product Filter
  public filterProducts(filter: any[]): Observable<Product[]> {
    return this.products.pipe(map(product =>
      product.filter((item: Product) => {
        if (!filter.length) return true
        const Tags = filter.some((prev) => { // Match Tags
          if (item.tags) {
            if (item.tags.includes(prev)) {
              return prev
            }
          }
        })
        return Tags
      })
    ));
  }

  // Sorting Filter
  public sortProducts(products: Product[], payload: string): any {

    if(payload === 'ascending') {
      return products.sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        } else if (a.id > b.id) {
          return 1;
        }
        return 0;
      })
    } else if (payload === 'a-z') {
      return products.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        } else if (a.title > b.title) {
          return 1;
        }
        return 0;
      })
    } else if (payload === 'z-a') {
      return products.sort((a, b) => {
        if (a.title > b.title) {
          return -1;
        } else if (a.title < b.title) {
          return 1;
        }
        return 0;
      })
    } else if (payload === 'low') {
      return products.sort((a, b) => {
        if (a.price < b.price) {
          return -1;
        } else if (a.price > b.price) {
          return 1;
        }
        return 0;
      })
    } else if (payload === 'high') {
      return products.sort((a, b) => {
        if (a.price > b.price) {
          return -1;
        } else if (a.price < b.price) {
          return 1;
        }
        return 0;
      })
    }
  }

  /*
    ---------------------------------------------
    ------------- Product Pagination  -----------
    ---------------------------------------------
  */
  public getPager(totalItems: number, currentPage: number = 1, pageSize: number = 16) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    // Paginate Range
    let paginateRange = 3;

    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else if(currentPage < paginateRange - 1){
      startPage = 1;
      endPage = startPage + paginateRange - 1;
    } else {
      startPage = currentPage - 1;
      endPage =  currentPage + 1;
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

}
