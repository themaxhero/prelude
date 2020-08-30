import { Kind2, Ap2 } from "../kind.ts";
import { AssertEquals } from "../test/asserts.ts";

export interface Semigroupoid<T extends Kind2> {
  compose: <I, J, K>(
    tij: Ap2<T, I, J>,
    tjk: Ap2<T, J, K>,
  ) => Ap2<T, I, K>;
}

export default Semigroupoid;

export const assertSemigroupoid = <T extends Kind2, I, J, K>(
  { assertEquals, compose, a, b, c }:
    & Semigroupoid<T>
    & { assertEquals: AssertEquals; a: I; b: J; c: K },
) => {
  assertEquals(
    compose<I, J, K>(compose<I, J, K>(a, b), c),
    compose<I, J, K>(a, compose<I, J, K>(b, c)),
    "semigroupoid associativity law",
  );
};
