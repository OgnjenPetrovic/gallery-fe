import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../../shared/services/gallery.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html'
})
export class GalleryComponent implements OnInit {
  private galleries;

  constructor(private galleryService: GalleryService, private route: ActivatedRoute) {
    // this.galleryService.getGalleries().subscribe(
    //   data => {
    //     this.galleries = data;
    //     console.log(data);
    //   },
    //   (err: HttpErrorResponse) => {
    //     alert(`Backend returned code ${err.status} with message: ${err.error}`);
    //   }
    // );
  }


  ngOnInit() {
    this.route.data
      .subscribe((data: any) => {
        this.galleries = data.gallery;
        console.log(this.galleries)
      });
  }

}
