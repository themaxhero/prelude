import { Kind2, Ap2 } from "../kind.ts";
import { AssertEquals } from "../test/asserts.ts";

export interface Profunctor<T extends Kind2> {
  promap: <A, B, C, D>(
    f: (x: A) => B,
    g: (x: C) => D,
    t: Ap2<T, B, C>,
  ) => Ap2<T, A, D>;
}

export default Profunctor;

// TODO: derive Profunctor
// map: (f, u) => promap(x => x, f, u)

export const testProfunctor = <T extends Kind2, A, B, C, D, E, F>(
  { promap, assertEquals, a, f, g, h, i }:
    & Profunctor<T>
    & {
      assertEquals: AssertEquals;
      a: Ap2<T, C, B>;
      f: (b: B) => C;
      g: (a: A) => B;
      h: (e: E) => F;
      i: (d: D) => E;
    },
) => {
  assertEquals(
    promap<A, A, B, B>((x: A): A => x, (x: B): B => x, a),
    a,
    "profunctor identity law",
  );

  assertEquals(
    promap<A, C, D, F>((x: A) => f(g(x)), (x: D) => h(i(x)), a),
    promap<A, B, E, F>(g, h, promap<B, C, D, E>(f, i, a)),
    "profunctor composition law",
  );
};
