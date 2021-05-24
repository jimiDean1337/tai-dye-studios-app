import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeSlider } from '../../../shared/data/slider';
import { Product } from '../../../shared/classes/product';
import { ProductService } from '../../../shared/services/product.service';
import { NewsletterComponent } from '../../../shared/components/modal/newsletter/newsletter.component';

@Component({
  selector: 'app-fashion-two',
  templateUrl: './fashion-two.component.html',
  styleUrls: ['./fashion-two.component.scss']
})
export class FashionTwoComponent implements OnInit {
  @ViewChild('newsletterModal', { static: true }) newsletter: NewsletterComponent;
  public themeLogo: string = 'assets/images/icon/logo.png'; // Change Logo

  public products : Product[] = [];
  public productCollections: any[] = [];

  constructor(public productService: ProductService) {
    this.productService.getProducts.subscribe(response => {
      this.products = response.filter(item => item.type == 'fashion');
      // Get Product Collection
      this.products.filter((item) => {
        item.collection.filter((collection) => {
          const index = this.productCollections.indexOf(collection);
          if (index === -1) this.productCollections.push(collection);
        })
      })
    });
  }

  public HomeSliderConfig: any = HomeSlider;

  public sliders = [{
    title: 'welcome to fashion',
    subTitle: 'Men fashion',
    image: 'http://placeimg.com/1920/780/any/sepia'
  },
  {
    title: 'welcome to fashion',
    subTitle: 'Women fashion',
    image: 'http://placeimg.com/1920/780/any/grayscale'
  }]

  // Collection banner
  public collections1 = [{
    image: 'http://placeimg.com/672/310/people/sepia',
    save: 'save 30%',
    title: 'Women'
  }, {
    image: 'http://placeimg.com/672/310/people/sepia',
    save: 'save 50%',
    title: 'Men'
  }];

  public collections2 = [{
    image: 'http://placeimg.com/672/310/people/sepia',
    save: 'save 30%',
    title: 'Pets'
  }, {
    image: 'http://placeimg.com/672/310/people/sepia',
    save: 'save 10%',
    title: 'Kids'
  }];

  ngOnInit(): void {
    // For testing only
    // setTimeout(() => {
    //   localStorage.setItem('newsletter', 'false')
    // }, 3000)
  }


  // Product Tab collection
  getCollectionProducts(collection) {
    return this.products.filter((item) => {
      if (item.collection.find(i => i === collection)) {
        return item
      }
    })
  }

}
