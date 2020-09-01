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

export const assertExtend = <T extends Kind, A, B, C>(
  args:
    & Extend<T>
    & {
      assertEquals: AssertEquals;
      a: Ap<T, A>;
      w: Ap<T, A>;
      f: (b: Ap<T, B>) => C;
      g: (a: Ap<T, A>) => B;
    },
) => {
  testFunctor<T, A, B, C>(args);

  const { extend, assertEquals, f, g, w } = args;

  assertEquals(
    extend<A, C>(f, extend<A, B>(g, w)),
    extend<A, C>((_: Ap<T, A>) => f(extend<A, B>(g, _)), w),
    "extend left identity law",
  );
};
