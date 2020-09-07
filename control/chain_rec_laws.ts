import Kind, { Ap } from "../kind.ts";
import { AssertEquals } from "../test/asserts.ts";
import { testChain } from "./chain_laws.ts";
import ChainRec, { Next, Done } from "./chain_rec.ts";

export const testChainRec = <T extends Kind, A, B, C>(
  { chainRec, ckta: p, cra: n, crb: d, ...args }: ChainRec<T> & {
    assertEquals: AssertEquals;
    ta: Ap<T, A>;
    f: (b: B) => C;
    g: (a: A) => B;
    ff: Ap<T, (b: B) => C>;
    fg: Ap<T, (a: A) => B>;
    cra: (x: Ap<T, A>) => Next<Ap<T, A>>;
    crb: (x: Ap<T, A>) => Next<Ap<T, B>>;
    ckta: (x: Ap<T, A>) => boolean;
  },
) => {
  testChain<T, A, B, C>(args);

  const {
    chain,
    map,
    assertEquals,
    ta: u,
  } = args;

  const step = (v: Ap<T, A>) => p(v) ? d(v) : chain<A, B>(step, n(v));

  assertEquals(
    chainRec<Ap<T, A>, Ap<T, B>>(
      (
        next: (a: Ap<T, A>) => Next<Ap<T, A>>,
        done: (a: Ap<T, A>) => Done<Ap<T, B>>,
        v: Ap<T, A>,
      ) =>
        p(v)
          ? map<Ap<T, A>, Done<Ap<T, B>>>(done, d(v))
          : map<Ap<T, A>, Next<Ap<T, A>>>(next, n(v)),
      u,
    ),
    step(u),
    "chain rec equivalence law",
  );

  // TODO: test stack usage
};
