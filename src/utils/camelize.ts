import camelCase from 'lodash/camelCase';

type AnyObject = { [key: string]: any };

const isAnyObject = (arg: unknown): arg is AnyObject =>
  typeof arg === 'object' && arg !== null;

export const camelizeKeysDeep = (value: unknown): any => {
  if (Array.isArray(value)) {
    return value.map(element => camelizeKeysDeep(element));
  }

  if (isAnyObject(value)) {
    const camelizeKeysObject = {} as AnyObject;
    Object.keys(value).forEach(
      key => (camelizeKeysObject[camelCase(key)] = camelizeKeysDeep(value[key]))
    );
    return camelizeKeysObject;
  }

  return value;
};
