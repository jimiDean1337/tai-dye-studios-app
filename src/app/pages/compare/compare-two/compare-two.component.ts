import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CompareSlider } from '../../../shared/data/slider';

@Component({
  selector: 'app-compare-two',
  templateUrl: './compare-two.component.html',
  styleUrls: ['./compare-two.component.scss']
})
export class CompareTwoComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Compare - Tai-Dye Studios | Creative Clothing &amp; Accessories')
  }

  public CompareSliderConfig: any = CompareSlider;

}
