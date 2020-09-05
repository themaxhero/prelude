import { Kind2, Ap2 } from "../kind.ts";
import { AssertEquals } from "../test/asserts.ts";

export interface Semigroupoid<T extends Kind2> {
  compose: <I, J, K>(
    tij: Ap2<T, I, J>,
    tjk: Ap2<T, J, K>,
  ) => Ap2<T, I, K>;
}

export default Semigroupoid;

export const testSemigroupoid = <T extends Kind2, A, B, C>(
  args: Semigroupoid<T> & { assertEquals: AssertEquals; a: A; b: B; c: C },
) => {
  const { assertEquals, compose, a: a, b: b, c: c } = args;

  assertEquals(
    compose<A, B, C>(compose<A, B, C>(a, b), c),
    compose<A, B, C>(a, compose<A, B, C>(b, c)),
    "semigroupoid associativity law",
  );
};
