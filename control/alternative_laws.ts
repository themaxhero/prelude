import Kind, { Ap } from "../kind.ts";
import { AssertEquals } from "../test/asserts.ts";
import { testApplicative } from "./applicative_laws.ts";
import { testPlus } from "./plus_laws.ts";
import Alternative from "./alternative.ts";

export const testAlternative = <T extends Kind, A, B, C>(
  args: Alternative<T> & {
    assertEquals: AssertEquals;
    a: A;
    d: B;
    ta: Ap<T, A>;
    tb: Ap<T, A>;
    tc: Ap<T, A>;
    f: (c: A) => B;
    g: (b: B) => C;
    ff: Ap<T, (x: A) => B>;
    fg: Ap<T, (x: B) => C>;
  },
) => {
  testApplicative<T, A, B, C>(args);
  testPlus<T, A, B, C>(args);

  const { ap, alt, zero, assertEquals, ta: a, tb: b, tc: c } = args;

  assertEquals(
    ap<A, A>(alt<A>(a, b), c),
    alt<A>(ap<A, A>(a, c), ap<A, A>(b, c)),
    "alternative distributivity law",
  );

  assertEquals(
    ap<A, A>(zero<A>(), a),
    zero<A>(),
    "alternative annihilation law",
  );
};
