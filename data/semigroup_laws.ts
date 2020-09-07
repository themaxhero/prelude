import { AssertEquals } from "../test/asserts.ts";
import Semigroup from "./semigroup.ts";

export const testSemigroup = <A>(
  { concat, assertEquals, a, b, c }: Semigroup<A> & {
    assertEquals: AssertEquals;
    a: A;
    b: A;
    c: A;
  },
) => {
  assertEquals(
    concat(concat(a, b), c),
    concat(a, concat(b, c)),
    "semigroup associativity law",
  );
};
