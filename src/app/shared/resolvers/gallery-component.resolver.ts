import { Injectable } from '@angular/core';
import {Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router} from '@angular/router';
import { GalleryService } from '../services/gallery.service';

@Injectable()
export class GalleryComponentResolver implements Resolve<any> {
  constructor(private galleryService: GalleryService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (route.paramMap.get('id') !== null) {
      return this.galleryService.getAuthorGalleries(route.paramMap.get('id'));
    }


    if (route.url.length > 0) {
      return this.galleryService.getLoggedUserGalleries();
    }

    return this.galleryService.getGalleries();
  }
}
