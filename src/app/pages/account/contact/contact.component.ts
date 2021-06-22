import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { DataService } from 'src/app/core/services/data/data.service';
import { WebsiteContactInfo } from 'src/app/shared/data/support.data';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public contactInfo = WebsiteContactInfo;

  public contactForm: FormGroup;

  public messageRegEx = /^[a-zA-Z0-9?$@#()'!,+\-=_:.&€£*%\s]+$/;

  constructor(public title: Title, public fb: FormBuilder, private dataService: DataService) {
    this.contactForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.maxLength(350)]]
    })
   }

  ngOnInit(): void {
    this.title.setTitle('Contact Us - Tai-Dye Studios | Creative Clothing &amp; Accessories');
  }

  addContact() {
    const data = this.contactForm.value;
    this.dataService.addContact(data).then(() => {
      this.contactForm.reset()
    });
  }

}
