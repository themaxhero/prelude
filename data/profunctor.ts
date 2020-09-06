import { Kind2, Ap2 } from "../kind.ts";

export interface Profunctor<T extends Kind2> {
  promap: <A, B, C, D>(
    f: (x: A) => B,
    g: (x: C) => D,
    t: Ap2<T, B, C>,
  ) => Ap2<T, A, D>;
}

export default Profunctor;

// TODO: derive Profunctor
// map: (f, u) => promap(x => x, f, u)
