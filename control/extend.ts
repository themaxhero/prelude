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
    tA1: Ap<T, A>;
    tA2: Ap<T, A>;
    fTBC1: (b: Ap<T, B>) => C;
    fTAB1: (a: Ap<T, A>) => B;
  },
) => {
  testFunctor<T, Ap<T, A>, B, C>({
    map: args.map,
    assertEquals: args.assertEquals,
    tA1: args.tA1,
    fAB1: args.fTAB1,
    fBC1: args.fTBC1,
  });

  const { extend, assertEquals, fTBC1: f, fTAB1: g, tA2: w } = args;

  assertEquals(
    extend<A, C>(f, extend<A, B>(g, w)),
    extend<A, C>((_: Ap<T, A>) => f(extend<A, B>(g, _)), w),
    "extend left identity law",
  );
};
