import kind, { ap } from "../../kind.ts";

export interface Contravariant<T extends kind> {
  contramap: <A, B>(
    f: (x: A) => B,
    t: ap<T, B>,
  ) => ap<T, A>;
}

export default Contravariant;
