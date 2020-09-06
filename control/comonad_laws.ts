import Kind, { Ap } from "../kind.ts";
import { AssertEquals } from "../test/asserts.ts";
import { testExtend } from "./extend_laws.ts";
import Comonad from "./comonad.ts";

export const testComonad = <T extends Kind, A, B, C>(
  args: Comonad<T> & {
    assertEquals: AssertEquals;
    ta: Ap<T, A>;
    tb: Ap<T, A>;
    ff: (a: Ap<T, A>) => B;
    fg: (b: Ap<T, B>) => C;
    f: (a: A) => B;
    g: (b: B) => C;
  },
) => {
  testExtend<T, A, B, C>(args);

  const { extract, extend, assertEquals, tb: w, fg: f } = args;

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
