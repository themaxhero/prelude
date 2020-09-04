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
  args: Profunctor<T> & {
    assertEquals: AssertEquals;
    tAB1: Ap2<T, A, B>;
    fBA1: (b: B) => A;
    fCB1: (a: C) => B;
    fED1: (e: E) => D;
    fFE1: (d: F) => E;
  },
) => {
  const { promap, assertEquals, tAB1: a, fBA1: f, fCB1: g, fED1: h, fFE1: i } =
    args;

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
