import { Kind2, Ap, Ap2, Flip } from "../kind.ts";
import Functor from "./functor.ts";

export interface Bifunctor<T extends Kind2> {
  bimap: <A, B, C, D>(
    f: (x: A) => B,
    g: (x: C) => D,
    t: Ap2<T, A, C>,
  ) => Ap2<T, B, D>;
  first: <A, B>(t: Ap2<T, A, B>) => Functor<Ap<Flip<T>, B>>;
  second: <A, B>(t: Ap2<T, A, B>) => Functor<Ap<T, A>>;
}

export default Bifunctor;

export const deriveBifunctor = <T extends Kind2>(
  { bimap, ...rest }: Pick<Bifunctor<T>, "bimap">,
): Bifunctor<T> => ({
  first: <A, B>(_t: Ap2<T, A, B>) => ({
    map: (f, u) => bimap(f, (x) => x, u),
  }),
  second: <A, B>(_t: Ap2<T, A, B>) => ({
    map: (f, u) => bimap((x) => x, f, u),
  }),
  bimap,
  ...rest,
});
