import Kind, { Ap } from "../kind.ts";

export interface Profunctor<T extends Kind<Kind>> {
  promap: <A, B, C, D>(
    f: (x: A) => B,
    g: (x: C) => D,
    t: Ap<Ap<T, B>, C>,
  ) => Ap<Ap<T, A>, D>;
}

export default Profunctor;
