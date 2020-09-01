import Kind, { Ap } from "../kind.ts";
import Apply, { testApply } from "./apply.ts";
import Functor from "../data/functor.ts";
import { AssertEquals } from "../test/asserts.ts";

export interface Chain<T extends Kind> extends Apply<T> {
  chain: <A, B>(
    f: (x: A) => Ap<T, B>,
    t: Ap<T, A>,
  ) => Ap<T, B>;
}

export default Chain;

export const deriveChain = <T extends Kind>(
  { chain, map, ...rest }:
    & Pick<Chain<T>, "chain">
    & Pick<Functor<T>, "map">,
): Chain<T> => ({
  ap: (uf, ux) => chain((f) => map(f, ux), uf),
  chain,
  map,
  ...rest,
});

export const testChain = <T extends Kind, A, B, C>(
  { map, chain, assertEquals, a, u, f, g, ...args }:
    & Chain<T>
    & {
      assertEquals: AssertEquals;
      a: Ap<T, (x: B) => A>;
      u: Ap<T, A>;
      v: Ap<T, (x: C) => B>;
      w: Ap<T, C>;
      f: (a: A) => B;
      g: (b: B) => C;
      h: (b: B) => A;
      i: (c: C) => B;
    },
) => {
  testApply<T, A, B, C>({
    ...deriveChain({ map, chain }),
    assertEquals,
    a,
    u: args.v,
    v: args.w,
    f: args.h,
    g: args.i,
  });

  assertEquals(
    chain(g, chain(f, u)),
    chain((x: A) => chain(g, f(x)), u),
    "chain associativity law",
  );
};
