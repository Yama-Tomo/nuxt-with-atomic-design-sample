export const swap = <T>(old: T, newVal: T, key: keyof T) =>
  (old[key] = newVal[key]);

export const replace = <T, K extends keyof T>(
  target: T,
  key: K,
  replaceVal: T[K]
) => (target[key] = replaceVal);
