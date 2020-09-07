import Kind, { Ap } from "../kind.ts";
import { AssertEquals } from "../test/asserts.ts";
import { testApply } from "./apply_laws.ts";
import Applicative from "./applicative.ts";

export const testApplicative = <T extends Kind, A, B, C>(
  { of, a: y, d: x, ...args }: Applicative<T> & {
    assertEquals: AssertEquals;
    a: A;
    d: B;
    ta: Ap<T, A>;
    f: (b: B) => C;
    g: (a: A) => B;
    ff: Ap<T, (b: B) => C>;
    fg: Ap<T, (a: A) => B>;
  },
) => {
  testApply<T, A, B, C>(args);

  const { ap, assertEquals, ta: v, f, fg: u } = args;

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
