import { AssertEquals } from "../test/asserts.ts";
import { testSemigroup } from "./semigroup_laws.ts";
import Monoid from "./monoid.ts";

export const testMonoid = <A>(
  { empty, ...args }: Monoid<A> & {
    assertEquals: AssertEquals;
    a: A;
    b: A;
    c: A;
  },
) => {
  testSemigroup<A>(args);

  const { concat, assertEquals, a } = args;

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
