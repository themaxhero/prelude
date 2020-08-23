import kind, { ap, flip } from '../kind.ts';
import Functor from './functor.ts';

export interface Bifunctor<T extends kind<kind>> {
  bimap: <A, B, C, D>(
    f: (x: A) => B,
    g: (x: C) => D,
    t: ap<ap<T, A>, C>
  ) => ap<ap<T, B>, D>;
  first: <A, B>(t: ap<ap<T, A>, B>) => Functor<ap<flip<T>, B>>;
  second: <A, B>(t: ap<ap<T, A>, B>) => Functor<ap<T, A>>;
}

export default Bifunctor;

export const deriveBifunctor = <T extends kind<kind<kind>>>(
  { bimap, ...rest }: Pick<Bifunctor<T>, 'bimap'>
): Bifunctor<T> => ({
  first: <A, B>(_t: ap<ap<T, A>, B>) => ({
    map: (f, u) => bimap(f, x => x, u),
  }),
  second: <A, B>(_t: ap<ap<T, A>, B>) => ({
    map: (f, u) => bimap(x => x, f, u),
  }),
  bimap,
  ...rest
});
