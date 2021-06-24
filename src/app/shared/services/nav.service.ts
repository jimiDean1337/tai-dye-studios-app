import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Menu
export interface Menu {
	path?: string;
	title?: string;
	type?: string;
	megaMenu?: boolean;
	image?: string;
	active?: boolean;
	badge?: boolean;
	badgeText?: string;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService {

	constructor() { }

	public screenWidth: any;
	public leftMenuToggle: boolean = false;
	public mainMenuToggle: boolean = false;

	// Window width
	@HostListener('window:resize', ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}

	MENUITEMS: Menu[] = [
		{
			title: 'Home', type: 'link', path: '/home', active: false,
		},
		{
			title: 'Shop', type: 'link', path: '/shop/collection', active: false,
		},
		{ title: 'faq', type: 'link', active: false, path: '/pages/faq' },
		{title: 'about us', type: 'link', active: false, path: '/pages/aboutus'},
		{ title: 'contact', type: 'link', active: false, path: '/pages/contact' },
	];

	LEFTMENUITEMS: Menu[] = [
		{
			title: 'clothing', type: 'sub', megaMenu: true, active: false, children: [
			  {
				  title: 'mens fashion',  type: 'link', active: false, children: [
					  { path: '/home', title: 'top',  type: 'link' },
					  { path: '/home', title: 'bottom',  type: 'link' },
					  { path: '/home', title: 'sports wear',  type: 'link' },
					  { path: '/home', title: 'shirts',  type: 'link' },
					  { path: '/home', title: 'bottom',  type: 'link' },
				  ]
			  },
			  {
				  title: 'women fashion',  type: 'link', active: false, children: [
					  { path: '/home', title: 'dresses',  type: 'link' },
					  { path: '/home', title: 'skirts',  type: 'link' },
					  { path: '/home', title: 'bottom',  type: 'link' },
					  { path: '/home', title: 'sports wear',  type: 'link' },
					  { path: '/home', title: 'bottom wear',  type: 'link' }
				  ]
			  },
			]
		},
		{
			title: 'bags', type: 'sub', active: false, children: [
			  { path: '/home/fashion', title: 'shopping bags', type: 'link' },
			]
		},
		{
			title: 'Accessories', type: 'sub', active: false, children: [
			  { path: '/home/fashion', title: 'water bottles', type: 'link' },
			  { path: '/home/fashion', title: 'caps and hats', type: 'link' },
			  { path: '/home/fashion', title: 'key chains', type: 'link' },
			]
		},
		{
			path: '/home/fashion', title: 'designs and graphics', type: 'link'
		},
	];

	// Array
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
	leftMenuItems = new BehaviorSubject<Menu[]>(this.LEFTMENUITEMS);

}
