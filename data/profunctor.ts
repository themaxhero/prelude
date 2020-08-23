import kind, { ap } from "../kind.ts";

export interface Profunctor<T extends kind<kind>> {
  promap: <A, B, C, D>(
    f: (x: A) => B,
    g: (x: C) => D,
    t: ap<ap<T, B>, C>,
  ) => ap<ap<T, A>, D>;
}

export default Profunctor;
