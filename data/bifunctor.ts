import { Kind2, Ap, Ap2, Flip } from "../kind.ts";
import Functor, { testFunctor } from "./functor.ts";
import { AssertEquals } from "../test/asserts.ts";

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

export const testBifunctor = <T extends Kind2, A, B, C, D, E, F>(
  args:
    & Bifunctor<T>
    & {
      assertEquals: AssertEquals;
      a: Ap2<T, A, D>;
      f: (b: B) => C;
      g: (a: A) => B;
      h: (e: E) => F;
      i: (d: D) => E;
    },
) => {
  const { first, second } = deriveBifunctor(args);
  const { assertEquals, bimap, a, f, g, h, i } = args;

  testFunctor<Ap<Flip<T>, D>, A, B, C>({
    ...first<D>(),
    assertEquals,
    a,
    g,
    f,
  });

  testFunctor<Ap<T, A>, A, B, C>({
    ...second<A>(),
    assertEquals,
    a,
    g,
    f,
  });

  assertEquals(
    bimap((x: A) => x, (x: D) => x, a),
    a,
    "bifunctor identity law",
  );

  assertEquals(
    bimap<A, C, D, F>(
      (x: A): C => f(g(x)),
      (x: D): F => h(i(x)),
      a,
    ),
    bimap<B, C, E, F>(
      f,
      h,
      bimap<A, B, D, E>(g, i, a),
    ),
    "bifunctor composition law",
  );
};
