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
    ta: Ap<T, A>;
    tb: Ap<T, A>;
    tc: Ap<T, A>;
    f: (a: A) => B;
    g: (b: B) => C;
  },
) => {
  const { alt, map, assertEquals, ta: a, tb: b, tc: c, f: f } = args;

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
