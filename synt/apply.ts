export const apply = <A extends unknown[], B extends unknown[], C>(
  f: (...args: [...A, ...B]) => C,
  ...a: A
) => (...b: B) => f(...a, ...b);

export default apply;
