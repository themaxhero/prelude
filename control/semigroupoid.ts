import Kind, { Ap } from "../kind.ts";

export interface Semigroupoid<T extends Kind<Kind>> {
  compose: <I, J, K>(
    tij: Ap<Ap<T, I>, J>,
    tjk: Ap<Ap<T, J>, K>,
  ) => Ap<Ap<T, I>, K>;
}

export default Semigroupoid;
