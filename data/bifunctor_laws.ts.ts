import { Kind2, Ap, Ap2, Flip } from "../kind.ts";
import { AssertEquals } from "../test/asserts.ts";
import { testFunctor } from "./functor_laws.ts";
import Bifunctor, { deriveBifunctor } from "./bifunctor.ts";

export const testBifunctor = <T extends Kind2, A, B, C, D, E, F>(
  args: Bifunctor<T> & {
    assertEquals: AssertEquals;
    tad: Ap2<T, A, D>;
    f: (a: A) => B;
    g: (b: B) => C;
    h: (d: D) => E;
    i: (e: E) => F;
  },
) => {
  const { first, second } = deriveBifunctor<T>(args);
  const { assertEquals, bimap, tad: a, g: f, f: g, i: h, h: i } = args;

  testFunctor<Ap<Flip<T>, D>, A, B, C>({
    ...args,
    ...first<D>(),
    assertEquals,
    ta: a,
  });

  testFunctor<Ap<T, A>, A, B, C>({
    ...args,
    ...second<A>(),
    assertEquals,
    ta: a,
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
