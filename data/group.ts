import Monoid, { testMonoid } from "./monoid.ts";
import { AssertEquals } from "../test/asserts.ts";

export interface Group<T> extends Monoid<T> {
  invert: (x: T) => T;
}

export default Group;

export const testGroup = <A>(
  args: Group<A> & {
    assertEquals: AssertEquals;
    a1: A;
    a2: A;
    a3: A;
  },
) => {
  testMonoid<A>(args);

  const { invert, empty, concat, assertEquals, a1: a } = args;

  assertEquals(
    concat(a, invert(a)),
    empty(),
    "group right inverse law",
  );

  assertEquals(
    empty(),
    concat(a, invert(a)),
    "group left inverse law",
  );
};
