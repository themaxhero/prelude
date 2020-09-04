import { AssertEquals } from "../test/asserts.ts";

export interface Semigroup<T> {
  concat: (x: T, y: T) => T;
}

export default Semigroup;

export const testSemigroup = <A>(
  args: Semigroup<A> & {
    assertEquals: AssertEquals;
    a1: A;
    a2: A;
    a3: A;
  },
) => {
  const { concat, assertEquals, a1: a, a2: b, a3: c } = args;

  assertEquals(
    concat(concat(a, b), c),
    concat(a, concat(b, c)),
    "semigroup associativity law",
  );
};
