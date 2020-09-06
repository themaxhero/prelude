import Kind, { Ap } from "../kind.ts";

export interface Foldable<T extends Kind> {
  reduce: <A, B>(
    f: (x: B, y: A) => B,
    x: B,
    u: Ap<T, A>,
  ) => B;
}

export default Foldable;
