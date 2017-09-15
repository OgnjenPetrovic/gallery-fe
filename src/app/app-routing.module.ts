import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { GalleryFormComponent } from './components/gallery/gallery-form/gallery-form.component';
import { GuestGuard } from './shared/guards/guest.guard';
import { AuthGuard } from './shared/guards/auth.guard';
import { GalleryDetailsComponent } from './components/gallery/gallery-details/gallery-details.component';
import { GalleryResolver } from './shared/resolvers/gallery.resolver';
import { GalleryComponentResolver } from './shared/resolvers/gallery-component.resolver';



const appRoutes: Routes = [
  { path: '', component: GalleryComponent, pathMatch: 'full', canActivate: [AuthGuard], resolve: { gallery: GalleryComponentResolver } },
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
  { path: 'create', component: GalleryFormComponent, canActivate: [AuthGuard] },
  { path: 'my-galleries', component: GalleryComponent, canActivate: [AuthGuard], resolve: { gallery: GalleryComponentResolver }},
  { path: 'gallery/:id', component: GalleryDetailsComponent, canActivate: [AuthGuard], resolve: { gallery: GalleryResolver }},
  { path: 'author/:id', component: GalleryComponent, canActivate: [AuthGuard], resolve: { gallery: GalleryComponentResolver }},
  // { path: 'search/:term', component: SearchPageComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
