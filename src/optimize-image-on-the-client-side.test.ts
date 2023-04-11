import { OptimizeImage } from './optimize-image-on-the-client-side';

describe('OptimizeImage', () => {
  let htmlToSpeech: OptimizeImage;

  beforeEach(() => {
    htmlToSpeech = new OptimizeImage();
  });

  it('should determine the instance', () => {
    const instance: OptimizeImage = new OptimizeImage();

    expect(instance).toBeDefined();
  });

});
