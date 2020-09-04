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
  args: Alt<T> & {
    assertEquals: AssertEquals;
    tA1: Ap<T, A>;
    tA2: Ap<T, A>;
    tA3: Ap<T, A>;
    fAB1: (a: A) => B;
    fBC1: (b: B) => C;
  },
) => {
  const { alt, map, assertEquals, tA1: a, tA2: b, tA3: c, fAB1: f } = args;

  testFunctor<T, A, B, C>(args);

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
