import Kind, { Ap, Flip } from "../kind.ts";
import Functor from "./functor.ts";

export interface Bifunctor<T extends Kind<Kind>> {
  bimap: <A, B, C, D>(
    f: (x: A) => B,
    g: (x: C) => D,
    t: Ap<Ap<T, A>, C>,
  ) => Ap<Ap<T, B>, D>;
  first: <A, B>(t: Ap<Ap<T, A>, B>) => Functor<Ap<Flip<T>, B>>;
  second: <A, B>(t: Ap<Ap<T, A>, B>) => Functor<Ap<T, A>>;
}

export default Bifunctor;

export const deriveBifunctor = <T extends Kind<Kind<Kind>>>(
  { bimap, ...rest }: Pick<Bifunctor<T>, "bimap">,
): Bifunctor<T> => ({
  first: <A, B>(_t: Ap<Ap<T, A>, B>) => ({
    map: (f, u) => bimap(f, (x) => x, u),
  }),
  second: <A, B>(_t: Ap<Ap<T, A>, B>) => ({
    map: (f, u) => bimap((x) => x, f, u),
  }),
  bimap,
  ...rest,
});
