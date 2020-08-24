import Kind, { Ap } from "../kind.ts";

export interface Foldable<T extends Kind> {
  reduce: <A, B>(
    f: (x: A, y: B) => A,
    x: A,
    u: Ap<T, B>,
  ) => A;
}

export default Foldable;
