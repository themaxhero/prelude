import { AssertEquals } from "../test/asserts.ts";

export interface Semigroup<T> {
  concat: (x: T, y: T) => T;
}

export default Semigroup;

export const testSemigroup = <A>(
  args: Semigroup<A> & {
    assertEquals: AssertEquals;
    a: A;
    b: A;
    c: A;
  },
) => {
  const { concat, assertEquals, a: a, b: b, c: c } = args;

  assertEquals(
    concat(concat(a, b), c),
    concat(a, concat(b, c)),
    "semigroup associativity law",
  );
};
