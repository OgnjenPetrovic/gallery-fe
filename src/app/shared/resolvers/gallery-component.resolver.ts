import { Injectable } from '@angular/core';
import {Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router} from '@angular/router';
import { GalleryService } from '../services/gallery.service';

@Injectable()
export class GalleryComponentResolver implements Resolve<any> {
  constructor(private galleryService: GalleryService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    // If author page is active
    if (route.paramMap.get('id') !== null) {
      return this.galleryService.getAuthorGalleries(route.paramMap.get('id'));
    }

    // If my gallery page is active
    if (route.url.length > 0) {
      return this.galleryService.getLoggedUserGalleries();
    }

    // if non above active
    return this.galleryService.getGalleries();
  }
}
