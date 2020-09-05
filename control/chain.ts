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
  args: Chain<T> & {
    assertEquals: AssertEquals;
    ta: Ap<T, A>;
    f: (a: A) => B;
    g: (b: B) => C;
    ff: Ap<T, (x: A) => B>;
    fg: Ap<T, (x: B) => C>;
  },
) => {
  testApply<T, A, B, C>({ ...args, ...deriveChain(args) });

  const { chain, assertEquals, ta: u, f: f, g: g } = args;

  assertEquals(
    chain(g, chain(f, u)),
    chain((x: A) => chain(g, f(x)), u),
    "chain associativity law",
  );
};
