import Kind, { Ap } from "../kind.ts";
import { AssertEquals } from "../test/asserts.ts";
import { testFunctor } from "../data/functor_laws.ts";
import Extend from "./extend.ts";

export const testExtend = <T extends Kind, A, B, C>(
  { extend, ff: f, fg: g, tb: w, ...args }: Extend<T> & {
    assertEquals: AssertEquals;
    ta: Ap<T, A>;
    tb: Ap<T, A>;
    ff: (b: Ap<T, B>) => C;
    fg: (a: Ap<T, A>) => B;
    f: (b: B) => C;
    g: (a: A) => B;
  },
) => {
  testFunctor<T, A, B, C>(args);

  const { assertEquals } = args;

  assertEquals(
    extend<A, C>(f, extend<A, B>(g, w)),
    extend<A, C>((_: Ap<T, A>) => f(extend<A, B>(g, _)), w),
    "extend left identity law",
  );
};
