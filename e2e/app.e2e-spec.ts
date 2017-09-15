import { GalleryFePage } from './app.po';

describe('gallery-fe App', () => {
  let page: GalleryFePage;

  beforeEach(() => {
    page = new GalleryFePage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
