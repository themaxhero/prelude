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
    tA1: Ap<T, A>;
    fAB1: (a: A) => B;
    fBC1: (b: B) => C;
    tfBC1: Ap<T, (x: B) => C>;
    tfAB1: Ap<T, (x: A) => B>;
    fTABN1: (x: Ap<T, A>) => Next<Ap<T, A>>;
    fTABD1: (x: Ap<T, A>) => Next<Ap<T, B>>;
    fTABoolean1: (x: Ap<T, A>) => boolean;
  },
) => {
  testChain<T, A, B, C>(args);

  const {
    chainRec,
    chain,
    map,
    assertEquals,
    tA1: u,
    fTABoolean1: p,
    fTABN1: n,
    fTABD1: d,
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
