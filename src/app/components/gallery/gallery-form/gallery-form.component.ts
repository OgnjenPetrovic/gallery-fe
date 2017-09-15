import { Component, OnInit } from '@angular/core';
import { Gallery } from '../../../shared/models/gallery.model';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {GalleryService} from '../../../shared/services/gallery.service';
import { Image} from '../../../shared/models/image.model';
import { HttpErrorResponse } from '@angular/common/http';
import {Router} from "@angular/router";

@Component({
  selector: 'app-gallery-form',
  templateUrl: './gallery-form.component.html'
})
export class GalleryFormComponent implements OnInit {
  galleryForm: FormGroup;
  private allowedExtensions = ['.png', '.jpg', '.jpeg'];
  private images: Image[];
  constructor(private galleryService: GalleryService, private router: Router) { }

  ngOnInit() {
    this.galleryForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required, Validators.maxLength(1000)]),
      'images': new FormArray([
        new FormControl(null, Validators.required)
      ])
    });
  }

  createGallery() {
    this.images = [];
    (<FormArray>this.galleryForm.get('images')).value.forEach(url => {
      const image = new Image(url);
      this.images.push(image)
    });

    let gallery = new Gallery(
      null,
      this.galleryForm.get('name').value,
      this.galleryForm.get('description').value,
      null,
      this.images);

    this.galleryService.create(gallery)
      .subscribe(
        (data) => {
          this.router.navigateByUrl('my-galleries');
        },
        (err: HttpErrorResponse) => {
          alert(`${err.error.error}`);
        }
      );
  }

  getGalleries() {

  }

  addUrl() {
    const control = new FormControl(null);
    (<FormArray>this.galleryForm.get('images')).push(control)
  }

  removeUrl(index) {
    const imageFormArray = (<FormArray>this.galleryForm.get('images'));
    console.log(imageFormArray.length);
    if (imageFormArray.length > 1) {
      imageFormArray.removeAt(index);
    }
  }



  // validationExtensions(controll: FormControl): { [s: string]: boolean } {
  //   // if (this.allowedExtensions.indexOf(controll.value) !== -1) {
  //   //   return null;
  //   // }
  //   return {'extensionNotAllowed': true};
  // }
}
