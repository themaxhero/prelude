import Kind, { Ap } from "../kind.ts";
import { AssertEquals } from "../test/asserts.ts";
import { testFunctor } from "../data/functor_laws.ts";
import Extend from "./extend.ts";

export const testExtend = <T extends Kind, A, B, C>(
  args: Extend<T> & {
    assertEquals: AssertEquals;
    ta: Ap<T, A>;
    tb: Ap<T, A>;
    ff: (a: Ap<T, A>) => B;
    fg: (b: Ap<T, B>) => C;
    f: (a: A) => B;
    g: (b: B) => C;
  },
) => {
  testFunctor<T, A, B, C>(args);

  const { extend, assertEquals, fg: f, ff: g, tb: w } = args;

  assertEquals(
    extend<A, C>(f, extend<A, B>(g, w)),
    extend<A, C>((_: Ap<T, A>) => f(extend<A, B>(g, _)), w),
    "extend left identity law",
  );
};
