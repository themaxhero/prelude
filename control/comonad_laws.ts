import Kind, { Ap } from "../kind.ts";
import { AssertEquals } from "../test/asserts.ts";
import { testExtend } from "./extend_laws.ts";
import Comonad from "./comonad.ts";

export const testComonad = <T extends Kind, A, B, C>(
  { extract, ...args }: Comonad<T> & {
    assertEquals: AssertEquals;
    ta: Ap<T, A>;
    tb: Ap<T, A>;
    ff: (b: Ap<T, B>) => C;
    fg: (a: Ap<T, A>) => B;
    f: (b: B) => C;
    g: (a: A) => B;
  },
) => {
  testExtend<T, A, B, C>(args);

  const { extend, assertEquals, tb: w, ff: f } = args;

  assertEquals(
    extend<A, A>(extract, w),
    w,
    "comonad left identity law",
  );

  assertEquals(
    extract<C>(extend<B, C>(f, w)),
    f(w),
    "comonad right identity law",
  );
};
