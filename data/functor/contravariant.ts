import Kind, { Ap } from "../../kind.ts";

export interface Contravariant<T extends Kind> {
  contramap: <A, B>(
    f: (x: A) => B,
    t: Ap<T, B>,
  ) => Ap<T, A>;
}

export default Contravariant;
