import kind, { ap } from "../kind.ts";

export interface Foldable<T extends kind> {
  reduce: <A, B>(
    f: (x: A, y: B) => A,
    x: A,
    u: ap<T, B>,
  ) => A;
}

export default Foldable;
