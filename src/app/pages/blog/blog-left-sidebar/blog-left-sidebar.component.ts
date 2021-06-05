import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-left-sidebar',
  templateUrl: './blog-left-sidebar.component.html',
  styleUrls: ['./blog-left-sidebar.component.scss']
})
export class BlogLeftSidebarComponent implements OnInit {

  constructor(public title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Blog - Tai-Dye Studios | Creative Clothing &amp; Accessories')
  }

}
