import Semigroup, { testSemigroup } from "./semigroup.ts";
import { AssertEquals } from "../test/asserts.ts";

export interface Monoid<T> extends Semigroup<T> {
  empty: () => T;
}

export default Monoid;

export const testMonoid = <A>(
  args: Monoid<A> & {
    assertEquals: AssertEquals;
    a1: A;
    a2: A;
    a3: A;
  },
) => {
  testSemigroup<A>(args);

  const { concat, empty, assertEquals, a1: a } = args;

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
