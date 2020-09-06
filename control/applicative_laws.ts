import Kind, { Ap } from "../kind.ts";
import { AssertEquals } from "../test/asserts.ts";
import { testApply } from "./apply_laws.ts";
import Applicative from "./applicative.ts";

export const testApplicative = <T extends Kind, A, B, C>(
  args: Applicative<T> & {
    assertEquals: AssertEquals;
    a: A;
    d: B;
    ta: Ap<T, A>;
    f: (c: A) => B;
    g: (b: B) => C;
    ff: Ap<T, (x: A) => B>;
    fg: Ap<T, (x: B) => C>;
  },
) => {
  testApply<T, A, B, C>(args);

  const { of, ap, assertEquals, ff: u, ta: v, g: f, d: x, a: y } = args;

  assertEquals(
    ap<A, A>(of<(x: A) => A>((x: A): A => x), v),
    v,
    "applicative identity law",
  );

  assertEquals(
    ap<B, C>(of<(b: B) => C>(f), of<B>(x)),
    of<C>(f(x)),
    "applicative homomorphism law",
  );

  assertEquals(
    ap<A, B>(u, of<A>(y)),
    ap<(x: A) => B, B>(of<(f: (c: A) => B) => B>((f: (c: A) => B) => f(y)), u),
    "applicative interchange law",
  );
};
