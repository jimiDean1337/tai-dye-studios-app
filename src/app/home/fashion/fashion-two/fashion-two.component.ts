import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeSlider } from '../../../shared/data/slider';
import { Product } from '../../../shared/classes/product';
import { ProductService } from '../../../shared/services/product.service';
import { NewsletterComponent } from '../../../shared/components/modal/newsletter/newsletter.component';
import { Title } from '@angular/platform-browser';
import { WebsiteContactInfo } from 'src/app/shared/data/support.data';
import { AnalyticsService } from 'src/app/core/services/analytics/analytics.service';
import { ActivatedRoute, Params } from '@angular/router';

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

  public HomeSliderConfig: any = HomeSlider;

  public sliders = [{
    title: 'express creativity',
    subTitle: 'Men\'s Apparel',
    image: 'assets/images/slider/men.jpg',
    alt: 'Creative Clothing For Men',
  },
  {
    title: 'express originality',
    subTitle: 'Women\'s Apparel',
    image: 'assets/images/slider/women.jpg',
    alt: 'Creative Clothing For Women',
  }]

  // Collection banner
  public collections1 = [{
    image: 'assets/images/banner/women.jpg',
    alt: 'Creative Clothing and Accesories Collection Banner',
    save: 'shop',
    title: 'Women'
  }, {
    image: 'assets/images/banner/men.jpg',
    alt: 'Creative Clothing and Accesories Collection Banner',
    save: 'shop',
    title: 'Men'
  }];

  public collections2 = [{
    image: 'assets/images/banner/featured.jpg',
    alt: 'Creative Clothing and Accesories Collection Banner',
    save: 'shop',
    title: 'Featured'
  }, {
    image: 'assets/images/banner/kids.jpg',
    alt: 'Creative Clothing and Accesories Collection Banner',
    save: 'shop',
    title: 'Kids'
  }];

  constructor(public title: Title, public productService: ProductService, public analytics: AnalyticsService) {
    this.productService.getProducts.subscribe(response => {
      this.products = response.filter(item => item.type == 'clothing');
      // Get Product Collection
      this.products.filter((item) => {
        item.collection.filter((collection) => {
          const index = this.productCollections.indexOf(collection);
          if (index === -1) this.productCollections.push(collection);
        })
      })
    });
  }

  ngOnInit(): void {
    // For testing only
    // setTimeout(() => {
    //   localStorage.setItem('newsletter', 'false')
    // }, 3000)
    this.title.setTitle(`Home - Tai-Dye Studios | Creative Clothing &amp; Accessories`);
    this.analytics.logEvent('splash');
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
