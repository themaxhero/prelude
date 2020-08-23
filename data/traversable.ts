import kind, { ap } from '../kind.ts';
import Functor from './functor.ts';
import Foldable from './foldable.ts';
import Applicative from '../control/applicative.ts';

export interface Traversable<T extends kind> extends Functor<T>, Foldable<T> {
  traverse: <U extends kind, A, B>(
    a: Applicative<U>,
    f: (x: A) => ap<U, B>,
    t: ap<T, A>,
  ) => ap<U, ap<T, B>>;
}

export default Traversable;
