import Kind, { Ap } from "../kind.ts";
import { AssertEquals } from "../test/asserts.ts";

export interface Functor<T extends Kind> {
  map: <A, B>(
    f: (x: A) => B,
    t: Ap<T, A>,
  ) => Ap<T, B>;
}

export default Functor;

export const testFunctor = <T extends Kind, A, B, C>(
  args: Functor<T> & {
    assertEquals: AssertEquals;
    tA1: Ap<T, A>;
    fAB1: (a: A) => B;
    fBC1: (b: B) => C;
  },
) => {
  const { map, assertEquals, tA1: a, fAB1: g, fBC1: f } = args;

  assertEquals(
    map<A, A>((x: A) => x, a),
    a,
    "functor identity law",
  );

  assertEquals(
    map<A, C>((x: A) => f(g(x)), a),
    map<B, C>(f, map<A, B>(g, a)),
    "functor composition law",
  );
};
