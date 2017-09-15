import { Injectable } from '@angular/core';
import { Gallery } from '../models/gallery.model';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class GalleryService {
  private galleries: Gallery[] = [];

  constructor(private http: HttpClient, private auth: AuthService) { }


  create(gallery: Gallery) {
    return new Observable((o: Observer<any>) => {
      this.http.post('http://127.0.0.1:8000/api/galleries', {
        'name': gallery.name,
        'description': gallery.description,
        'images': gallery.images,
      }, {
        headers: this.auth.getRequestHeaders(),
      })
        .subscribe(
          data => {
            o.next(data);
            return o.complete();
          },
          (err) => {
            return o.error(err);
          }
        );
    });
  }

  getGalleries() {
    return new Observable((o: Observer<any>) => {
      this.http.get('http://localhost:8000/api/galleries', {
        headers: this.auth.getRequestHeaders(),
      })
        .subscribe(
          (data: any[]) => {
            this.setGalleriesFromResponse(data);
            o.next(this.galleries);
            return o.complete();
          }
        );
    });
  }

  getLoggedUserGalleries() {
    return new Observable((o: Observer<any>) => {
      this.http.get('http://localhost:8000/api/galleries/auth-user', {
        headers: this.auth.getRequestHeaders(),
      })
        .subscribe(
          (data: any[]) => {
            this.setGalleriesFromResponse(data);
            o.next(this.galleries);
            return o.complete();
          }
        );
    });
  }

  getGalleryById(id) {
    return new Observable((o: Observer<any>) => {
      this.http.get('http://localhost:8000/api/galleries/' + id,
        {
          headers: this.auth.getRequestHeaders(),
        })
        .subscribe(
          (data: any) => {
            o.next(new Gallery(data.id, data.name, data.description, data.user, data.images));
            return o.complete();
          }
        );
    });
  }

  getAuthorGalleries(id) {
    return new Observable((o: Observer<any>) => {
      this.http.get('http://localhost:8000/api/galleries/author/' + id,
        {
          headers: this.auth.getRequestHeaders(),
        })
        .subscribe(
          (data: any) => {
            this.setGalleriesFromResponse(data);
            o.next(this.galleries);
            return o.complete();
          }
        );
    });
  }

  setGalleriesFromResponse(data) {
    this.galleries = [];
    data.forEach(g => {
      this.galleries.push(new Gallery(g.id, g.name, g.description, g.user, g.images));
    });
  }
}
