import Kind, { Ap } from "../kind.ts";
import Applicative, { testApplicative } from "./applicative.ts";
import Plus, { testPlus } from "./plus.ts";
import { AssertEquals } from "../test/asserts.ts";

export interface Alternative<T extends Kind> extends Applicative<T>, Plus<T> {}

export default Alternative;

export const testAlternative = <T extends Kind, A, B, C>(
  args: Alternative<T> & {
    assertEquals: AssertEquals;
    tA1: Ap<T, A>;
    tA2: Ap<T, A>;
    tA3: Ap<T, A>;
    a1: A;
    b1: B;
    fAB1: (c: A) => B;
    fBC1: (b: B) => C;
    tfAB1: Ap<T, (x: A) => B>;
    tfBC1: Ap<T, (x: B) => C>;
  },
) => {
  testApplicative<T, A, B, C>(args);
  testPlus<T, A, B, C>(args);

  const { ap, alt, zero, assertEquals, tA1: a, tA2: b, tA3: c } = args;

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
