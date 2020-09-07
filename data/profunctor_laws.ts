import { Kind2, Ap2 } from "../kind.ts";
import { AssertEquals } from "../test/asserts.ts";
import Profunctor from "./profunctor.ts";

export const testProfunctor = <T extends Kind2, A, B, C, D, E, F>(
  { promap, assertEquals, tab: a, j: f, k: g, l: h, m: i }: Profunctor<T> & {
    assertEquals: AssertEquals;
    tab: Ap2<T, A, B>;
    j: (b: B) => A;
    k: (a: C) => B;
    l: (e: E) => D;
    m: (d: F) => E;
  },
) => {
  assertEquals(
    promap<C, C, B, B>((x: C): C => x, (x: B): B => x, a),
    a,
    "profunctor identity law",
  );

  assertEquals(
    promap<C, A, F, D>((x: C) => f(g(x)), (x: F) => h(i(x)), a),
    promap<C, B, E, D>(g, h, promap<B, A, F, E>(f, i, a)),
    "profunctor composition law",
  );
};
