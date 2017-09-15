import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { CustomFormsModule } from 'ng2-validation'
import { RegisterService } from './services/register.service';
import { GalleryService } from './services/gallery.service';
import { GalleryResolver } from './resolvers/gallery.resolver';
import { GalleryComponentResolver } from './resolvers/gallery-component.resolver';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    CustomFormsModule
  ],
  providers: [
    AuthService,
    RegisterService,
    AuthGuard,
    GuestGuard,
    GalleryService,
    GalleryResolver,
    GalleryComponentResolver
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class SharedModule { }
