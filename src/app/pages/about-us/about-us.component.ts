import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TeamMemberProfile } from 'src/app/shared/classes/team';
import { TEAM } from 'src/app/shared/data/team.data';
import { TeamSlider, TestimonialSlider } from '../../shared/data/slider';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  public TeamSliderConfig: any = TeamSlider;
  public TestimonialSliderConfig: any = TestimonialSlider;

  // Testimonial Carousel
  public testimonial = [{
    image: 'assets/images/icon/user-profile-default.png',
    name: 'Alanna Fluhart',
    designation: 'Customer',
    description: 'Tai-Dye Studios has wonderful shirts and stuff! Such soft quality T-shirts! My family has ordered a lot and I am ordering more! Highly recommend.',
  }, {
    image: 'assets/images/icon/user-profile-default.png',
    name: 'Alex Braniff',
    designation: 'New User',
    description: 'Very impressed with the printing quality. My shirts are one-of-a-kind, and I can\'t wait to see what you offer next!',
  }, {
    image: 'assets/images/icon/user-profile-default.png',
    name: 'John Shipmen',
    designation: 'Anonymous',
    description: 'My items were delivered on time and I received exactly what I purchased. Wayyy better than the last place I bought from XD Thanks!.',
  }]

  // Team
  public team: TeamMemberProfile[] = TEAM;
  constructor(public title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('About Us - Tai-Dye Studios | Creative Clothing &amp; Accessories');
  }

}
