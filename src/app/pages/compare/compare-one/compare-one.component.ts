import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-compare-one',
  templateUrl: './compare-one.component.html',
  styleUrls: ['./compare-one.component.scss']
})
export class CompareOneComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Compare - Tai-Dye Studios | Creative Clothing &amp; Accessories')
  }

}
