import Kind, { Ap } from "../kind.ts";
import Applicative, { testApplicative } from "./applicative.ts";
import Plus, { testPlus } from "./plus.ts";
import { AssertEquals } from "../test/asserts.ts";

export interface Alternative<T extends Kind> extends Applicative<T>, Plus<T> {}

export default Alternative;

export const testAlternative = <T extends Kind, A, B, C>(
  { d, h, i, ...args }:
    & Alternative<T>
    & {
      assertEquals: AssertEquals;
      a: Ap<T, A>;
      b: Ap<T, A>;
      c: Ap<T, A>;
      d: Ap<T, (x: B) => A>;
      u: Ap<T, (x: C) => B>;
      v: Ap<T, C>;
      f: (a: A) => B;
      g: (b: B) => C;
      h: (b: B) => A;
      i: (c: C) => B;
      x: B;
      y: C;
    },
) => {
  testApplicative<T, A, B, C>({ ...args, a: d, f: h, g: i });
  testPlus<T, A, B, C>(args);

  const { ap, alt, zero, assertEquals, a, b, c } = args;

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
