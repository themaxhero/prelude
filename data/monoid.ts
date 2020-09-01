import Semigroup, { testSemigroup } from "./semigroup.ts";
import { AssertEquals } from "../test/asserts.ts";

export interface Monoid<T> extends Semigroup<T> {
  empty: () => T;
}

export default Monoid;

export const testMonoid = <T>(
  args: Monoid<T> & { assertEquals: AssertEquals; a: T; b: T; c: T },
) => {
  testSemigroup<T>(args);

  const { concat, empty, assertEquals, a } = args;

  assertEquals(
    concat(a, empty()),
    a,
    "monoid right identity law",
  );

  assertEquals(
    concat(empty(), a),
    a,
    "monoid left identity law",
  );
};
