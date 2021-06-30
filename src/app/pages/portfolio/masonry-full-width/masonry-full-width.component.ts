import { Component, OnInit, AfterViewInit} from '@angular/core';
import { ButtonsConfiguration, PlainGalleryConfiguration } from '../../../shared/data/portfolio';
import { Image, AdvancedLayout } from '@ks89/angular-modal-gallery';

@Component({
  selector: 'app-masonry-full-width',
  templateUrl: './masonry-full-width.component.html',
  styleUrls: ['./masonry-full-width.component.scss']
})
export class MasonryFullWidthComponent implements OnInit, AfterViewInit  {

  public galleryFilter: string = 'all'
  public ButtonsConfig: any = ButtonsConfiguration;
  public GalleryConfig: any = PlainGalleryConfiguration;

  public Images;

  public AllImage = [
    new Image(1, { img: 'assets/images/product/tshirts/1_front.jpg' }),
    new Image(2, { img: 'assets/images/product/tshirts/2_front.jpg' }),
    new Image(3, { img: 'assets/images/product/tshirts/3_front.jpg' }),
    new Image(4, { img: 'assets/images/product/tshirts/4_front.jpg' }),
    new Image(5, { img: 'assets/images/product/tshirts/5_front.jpg' }),
    new Image(6, { img: 'assets/images/product/tshirts/6_front.jpg' }),
    new Image(7, { img: 'assets/images/product/tshirts/7_front.jpg' }),
    new Image(8, { img: 'assets/images/product/tshirts/8_front.jpg' }),
    new Image(8, { img: 'assets/images/product/tshirts/9_front.jpg' }),
    new Image(8, { img: 'assets/images/product/tshirts/10_front.jpg' }),
    new Image(8, { img: 'assets/images/product/tshirts/11_front.jpg' }),
    new Image(8, { img: 'assets/images/product/tshirts/12_front.jpg' }),
  ];

  public FashionImage = [
    new Image(1, { img: 'assets/images/product/tshirts/1_front.jpg' }),
    new Image(2, { img: 'assets/images/product/tshirts/2_front.jpg' }),
    new Image(3, { img: 'assets/images/product/tshirts/3_front.jpg' }),
    new Image(4, { img: 'assets/images/product/tshirts/4_front.jpg' }),
    new Image(5, { img: 'assets/images/product/tshirts/5_front.jpg' }),
    new Image(6, { img: 'assets/images/product/tshirts/6_front.jpg' }),
    new Image(7, { img: 'assets/images/product/tshirts/7_front.jpg' }),
    new Image(8, { img: 'assets/images/product/tshirts/8_front.jpg' }),
    new Image(8, { img: 'assets/images/product/tshirts/9_front.jpg' }),
    new Image(8, { img: 'assets/images/product/tshirts/10_front.jpg' }),
    new Image(8, { img: 'assets/images/product/tshirts/11_front.jpg' }),
    new Image(8, { img: 'assets/images/product/tshirts/12_front.jpg' }),
  ]

  public ShoesImages = [
    new Image(1, { img: 'assets/images/product/tshirts/1_front.jpg' }),
    new Image(2, { img: 'assets/images/product/tshirts/2_front.jpg' }),
    new Image(3, { img: 'assets/images/product/tshirts/3_front.jpg' }),
    new Image(4, { img: 'assets/images/product/tshirts/4_front.jpg' }),
    new Image(5, { img: 'assets/images/product/tshirts/5_front.jpg' }),
    new Image(6, { img: 'assets/images/product/tshirts/6_front.jpg' }),
    new Image(7, { img: 'assets/images/product/tshirts/7_front.jpg' }),
    new Image(8, { img: 'assets/images/product/tshirts/8_front.jpg' }),
    new Image(8, { img: 'assets/images/product/tshirts/9_front.jpg' }),
    new Image(8, { img: 'assets/images/product/tshirts/10_front.jpg' }),
    new Image(8, { img: 'assets/images/product/tshirts/11_front.jpg' }),
    new Image(8, { img: 'assets/images/product/tshirts/12_front.jpg' }),
  ]

  public WatchImages = [
    new Image(1, { img: 'assets/images/product/tshirts/1_front.jpg' }),
    new Image(2, { img: 'assets/images/product/tshirts/2_front.jpg' }),
    new Image(3, { img: 'assets/images/product/tshirts/3_front.jpg' }),
    new Image(4, { img: 'assets/images/product/tshirts/4_front.jpg' }),
    new Image(5, { img: 'assets/images/product/tshirts/5_front.jpg' }),
    new Image(6, { img: 'assets/images/product/tshirts/6_front.jpg' }),
    new Image(7, { img: 'assets/images/product/tshirts/7_front.jpg' }),
    new Image(8, { img: 'assets/images/product/tshirts/8_front.jpg' }),
    new Image(8, { img: 'assets/images/product/tshirts/9_front.jpg' }),
    new Image(8, { img: 'assets/images/product/tshirts/10_front.jpg' }),
    new Image(8, { img: 'assets/images/product/tshirts/11_front.jpg' }),
    new Image(8, { img: 'assets/images/product/tshirts/12_front.jpg' }),
  ]

  constructor() { }

  ngOnInit(): void {
    this.Images = this.AllImage
  }

  ngAfterViewInit(): void {
    setTimeout(function(){
        // vanilla JS
        var grid = document.querySelector('.isotopeContainer');
        new (<any>window).Isotope( grid, {
          // options...
          itemSelector: '.isotopeSelector'
        });
    }, 1000);
  }

  openImage(image) {
    const index: number = this.getCurrentIndexCustomLayout(image, this.Images);
    this.GalleryConfig = Object.assign({}, this.GalleryConfig, {
        layout: new AdvancedLayout(index, true)
    });
  }

  getCurrentIndexCustomLayout(image: Image, images: Image[]): number {
    return image ? images.indexOf(image) : -1;
  };

  filter(term) {

    if(term == 'all') {
      this.Images = this.AllImage
    } else if(term == 'mens') {
      this.Images = this.FashionImage
    } else if(term == 'womens') {
      this.Images = this.ShoesImages
    } else if(term == 'kids') {
      this.Images = this.WatchImages
    }

    this.galleryFilter = term

    // For isotop layout
    setTimeout(function(){
      // vanilla JS
      var grid = document.querySelector('.isotopeContainer');
      new (<any>window).Isotope( grid, { filter: '.'+term });
    }, 500);

  }

}
