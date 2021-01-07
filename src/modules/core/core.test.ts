import Core from './core';

describe('Core class tests', () => {
  const newCore = new Core();

  test('Health check is fine', () => {
    expect(newCore.healthCheck()).toEqual('check');
  });
});
