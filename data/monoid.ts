import Semigroup, { assertSemigroup } from "./semigroup.ts";
import { AssertEquals } from "../test/asserts.ts";

export interface Monoid<T> extends Semigroup<T> {
  empty: () => T;
}

export default Monoid;

export const assertMonoid = <T>(
  args: Monoid<T> & { assertEquals: AssertEquals; a: T; b: T; c: T },
) => {
  assertSemigroup(args);

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
