import { number } from 'yargs';
import Core from './core';

describe('Core class tests', () => {
  const newCore = new Core();

  test('Health check is fine', () => {
    expect(newCore.healthCheck()).toEqual('check');
  });

  test('Get Auth Bearer token', () => {
    return newCore.getAuth().then((res) => {
      expect(res.auth).toBe(true);
    });
  });

  test('Get images from API', () => {
    return newCore.getImages().then((res) => {
      expect(res).toEqual({
        pictures: expect.any(Array),
        hasMore: expect.any(Boolean),
        page: expect.any(Number),
        pageCount: expect.any(Number),
      });
    });
  });

  test('Get images from API within a specific page 2', () => {
    return newCore.getImages(2).then((res) => {
      expect(res).toEqual({
        pictures: expect.any(Array),
        hasMore: expect.any(Boolean),
        page: 2,
        pageCount: expect.any(Number),
      });
    });
  });
});
