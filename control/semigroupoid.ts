import kind, { ap } from '../kind.ts';

export interface Semigroupoid<T extends kind<kind>> {
  compose: <I, J, K>(
    tij: ap<ap<T, I>, J>,
    tjk: ap<ap<T, J>, K>,
  ) => ap<ap<T, I>, K>;
}

export default Semigroupoid;
