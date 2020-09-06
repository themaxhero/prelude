import { Kind2, Ap, Ap2, Flip } from "../kind.ts";
import Functor from "./functor.ts";

export interface Bifunctor<T extends Kind2> {
  bimap: <A, B, C, D>(
    f: (x: A) => B,
    g: (x: C) => D,
    t: Ap2<T, A, C>,
  ) => Ap2<T, B, D>;
  first: <J>() => Functor<Ap<Flip<T>, J>>;
  second: <I>() => Functor<Ap<T, I>>;
}

export default Bifunctor;

export const deriveBifunctor = <T extends Kind2>(
  { bimap, ...rest }: Pick<Bifunctor<T>, "bimap">,
): Bifunctor<T> => ({
  first: <J>(): Functor<Ap<Flip<T>, J>> => ({
    map: <A, B>(f: (x: A) => B, u: Ap2<T, J, A>): Ap2<T, B, J> =>
      bimap<A, B, A, A>(f, (x: A): A => x, u),
  }),
  second: <I>(): Functor<Ap<T, I>> => ({
    map: <A, B>(f: (x: A) => B, u: Ap2<T, A, I>): Ap2<T, I, B> =>
      bimap<A, A, A, B>((x: A): A => x, f, u),
  }),
  bimap,
  ...rest,
});
