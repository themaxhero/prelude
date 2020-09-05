import Kind, { Ap } from "../kind.ts";
import Chain, { testChain } from "./chain.ts";
import { AssertEquals } from "../test/asserts.ts";

export interface Next<T> {
  tag: "next";
  value: T;
}

export interface Done<T> {
  tag: "done";
  value: T;
}

export interface ChainRec<T extends Kind> extends Chain<T> {
  chainRec: <A, B>(
    f: (
      n: (a: A) => Next<A>,
      d: (b: B) => Done<B>,
      a: A,
    ) => Ap<T, Next<A> | Done<B>>,
    a: A,
  ) => Ap<T, B>;
}

export default ChainRec;

export const testChainRec = <T extends Kind, A, B, C>(
  args: ChainRec<T> & {
    assertEquals: AssertEquals;
    ta: Ap<T, A>;
    f: (a: A) => B;
    g: (b: B) => C;
    ff: Ap<T, (x: A) => B>;
    fg: Ap<T, (x: B) => C>;
    cra: (x: Ap<T, A>) => Next<Ap<T, A>>;
    crb: (x: Ap<T, A>) => Next<Ap<T, B>>;
    ckta: (x: Ap<T, A>) => boolean;
  },
) => {
  testChain<T, A, B, C>(args);

  const {
    chainRec,
    chain,
    map,
    assertEquals,
    ta: u,
    ckta: p,
    cra: n,
    crb: d,
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
