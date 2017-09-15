import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { GalleryService } from '../services/gallery.service';

@Injectable()
export class GalleryResolver implements Resolve<any> {
  constructor(private galleryService: GalleryService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = parseInt(route.paramMap.get('id'));

    return this.galleryService.getGalleryById(id);
  }
}
