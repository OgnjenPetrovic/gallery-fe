import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryService } from '../../../shared/services/gallery.service';
import { Gallery } from '../../../shared/models/gallery.model';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-gallery-details',
  templateUrl: './gallery-details.component.html'
})
export class GalleryDetailsComponent implements OnInit {
  private gallery: Gallery;

  constructor(private route: ActivatedRoute, private galleryService: GalleryService) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: any) => {
        this.gallery = data.gallery;
        console.log(this.gallery)
      });
  }
}
