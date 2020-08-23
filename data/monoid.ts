import Semigroup from './semigroup.ts';

export interface Monoid<T> extends Semigroup<T> {
  empty: () => T;
}

export default Monoid;
