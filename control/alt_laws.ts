import Kind, { Ap } from "../kind.ts";
import { AssertEquals } from "../test/asserts.ts";
import { testFunctor } from "../data/functor_laws.ts";
import Alt from "./alt.ts";

export const testAlt = <T extends Kind, A, B, C>(
  { alt, tb: b, tc: c, ...args }: Alt<T> & {
    assertEquals: AssertEquals;
    ta: Ap<T, A>;
    tb: Ap<T, A>;
    tc: Ap<T, A>;
    f: (b: B) => C;
    g: (a: A) => B;
  },
) => {
  testFunctor<T, A, B, C>(args);

  const { map, assertEquals, ta: a, g } = args;

  assertEquals(
    alt<A>(alt<A>(a, b), c),
    alt<A>(a, alt<A>(b, c)),
    "alt associativity law",
  );

  assertEquals(
    map<A, B>(g, alt<A>(a, b)),
    alt<B>(map<A, B>(g, a), map<A, B>(g, b)),
    "alt distributivity law",
  );
};
