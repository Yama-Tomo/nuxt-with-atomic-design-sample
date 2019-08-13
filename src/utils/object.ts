export const keys = <T extends {}>(o: T) =>
  Object.keys(o) as (keyof typeof o)[];
