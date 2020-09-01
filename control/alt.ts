import Kind, { Ap } from "../kind.ts";
import Functor, { testFunctor } from "../data/functor.ts";
import { AssertEquals } from "../test/asserts.ts";

export interface Alt<T extends Kind> extends Functor<T> {
  alt: <A>(
    x: Ap<T, A>,
    y: Ap<T, A>,
  ) => Ap<T, A>;
}

export default Alt;

export const testAlt = <T extends Kind, A, B, C>(
  { f, g, ...args }:
    & Alt<T>
    & {
      assertEquals: AssertEquals;
      a: Ap<T, A>;
      b: Ap<T, A>;
      c: Ap<T, A>;
      f: (a: A) => B;
      g: (b: B) => C;
    },
) => {
  testFunctor<T, A, B, C>({ ...args, f: g, g: f });

  const { alt, map, assertEquals, a, b, c } = args;

  assertEquals(
    alt<A>(alt<A>(a, b), c),
    alt<A>(a, alt<A>(b, c)),
    "alt associativity law",
  );

  assertEquals(
    map<A, B>(f, alt<A>(a, b)),
    alt<B>(map<A, B>(f, a), map<A, B>(f, b)),
    "alt distributivity law",
  );
};
