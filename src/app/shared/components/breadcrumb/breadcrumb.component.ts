import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input() title : string;
  @Input() breadcrumb: string;
  @Input() parent?: {name: string, link: string, params?: any};

  constructor() {
  }

  ngOnInit() : void {  }

}
