const entries = <TObject extends Record<PropertyKey, unknown>>(object: TObject) =>
  Object.entries(object) as [keyof TObject, TObject[keyof TObject]][];

export const shallowEqual = <TObject extends Record<PropertyKey, unknown>>(
  object1: TObject,
  object2: TObject
) =>
  Object.keys(object1).length === Object.keys(object2).length &&
  entries(object1).every(([key, value]) => key in object2 && value === object2[key]);
