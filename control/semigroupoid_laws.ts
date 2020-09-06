import { Kind2 } from "../kind.ts";
import { AssertEquals } from "../test/asserts.ts";
import Semigroupoid from "./semigroupoid.ts";

export const testSemigroupoid = <T extends Kind2, A, B, C>(
  args: Semigroupoid<T> & { assertEquals: AssertEquals; a: A; b: B; c: C },
) => {
  const { assertEquals, compose, a, b, c } = args;

  assertEquals(
    compose<A, B, C>(compose<A, B, C>(a, b), c),
    compose<A, B, C>(a, compose<A, B, C>(b, c)),
    "semigroupoid associativity law",
  );
};
