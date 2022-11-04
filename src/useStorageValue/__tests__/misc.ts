import Mocked = jest.Mocked;

export const newStorage = (
  get: Storage['getItem'] = () => null,
  set: Storage['setItem'] = () => {},
  remove: Storage['removeItem'] = () => {}
) => {
  return {
    getItem: jest.fn(get),
    setItem: jest.fn(set),
    removeItem: jest.fn(remove),
  } as unknown as Mocked<Storage>;
};
