import { AssertEquals } from "../test/asserts.ts";
import Semigroup from "./semigroup.ts";

export const testSemigroup = <A>(
  args: Semigroup<A> & {
    assertEquals: AssertEquals;
    a: A;
    b: A;
    c: A;
  },
) => {
  const { concat, assertEquals, a, b, c } = args;

  assertEquals(
    concat(concat(a, b), c),
    concat(a, concat(b, c)),
    "semigroup associativity law",
  );
};
