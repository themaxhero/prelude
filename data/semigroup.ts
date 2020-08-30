import { AssertEquals } from "../test/asserts.ts";

export interface Semigroup<T> {
  concat: (x: T, y: T) => T;
}

export default Semigroup;

export const testSemigroup = <T>(
  { concat, assertEquals, a, b, c }:
    & Semigroup<T>
    & { assertEquals: AssertEquals; a: T; b: T; c: T },
) => {
  assertEquals(
    concat(concat(a, b), c),
    concat(a, concat(b, c)),
    "semigroup associativity law",
  );
};
