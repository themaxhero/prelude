import Kind, { Ap } from "../kind.ts";
import { AssertEquals } from "../test/asserts.ts";
import { testFunctor } from "../data/functor_laws.ts";
import Alt from "./alt.ts";

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
  const { alt, map, assertEquals, ta: a, tb: b, tc: c, f } = args;

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
