import { Image } from 'app/shared/models/image.model';
import { User } from './user.model';

export class Gallery {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public user?: User,
    public images?: Image[]
  ) {}
}
