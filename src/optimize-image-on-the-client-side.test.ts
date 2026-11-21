import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { OptimizeImage } from './optimize-image-on-the-client-side';

describe('OptimizeImage', () => {
  it('should determine the instance', () => {
    const instance: OptimizeImage = new OptimizeImage();

    assert.ok(instance);
  });
});
