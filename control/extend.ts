import Kind, { Ap } from "../kind.ts";
import Functor, { testFunctor } from "../data/functor.ts";
import { AssertEquals } from "../test/asserts.ts";

export interface Extend<T extends Kind> extends Functor<T> {
  extend: <A, B>(
    f: (t: Ap<T, A>) => B,
    t: Ap<T, A>,
  ) => Ap<T, B>;
}

export default Extend;

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
