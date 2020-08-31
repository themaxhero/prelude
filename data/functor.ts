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
  { map, assertEquals, a, f, g }:
    & Functor<T>
    & {
      assertEquals: AssertEquals;
      a: Ap<T, A>;
      f: (c: B) => C;
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
