import Kind, { Ap } from "../kind.ts";
import { AssertEquals } from "../test/asserts.ts";
import Functor from "./functor.ts";

export const testFunctor = <T extends Kind, A, B, C>(
  { map, assertEquals, ta: a, f, g }: Functor<T> & {
    assertEquals: AssertEquals;
    ta: Ap<T, A>;
    f: (b: B) => C;
    g: (a: A) => B;
  },
) => {
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
