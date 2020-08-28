import { Kind2, Ap2 } from "../kind.ts";

export interface Semigroupoid<T extends Kind2> {
  compose: <I, J, K>(
    tij: Ap2<T, I, J>,
    tjk: Ap2<T, J, K>,
  ) => Ap2<T, I, K>;
}

export default Semigroupoid;
