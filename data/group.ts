import Monoid, { testMonoid } from "./monoid.ts";
import { AssertEquals } from "../test/asserts.ts";

export interface Group<T> extends Monoid<T> {
  invert: (x: T) => T;
}

export default Group;

export const testGroup = <T>(
  args: Group<T> & { assertEquals: AssertEquals; a: T; b: T; c: T },
) => {
  testMonoid<T>(args);

  const { invert, empty, concat, assertEquals, a } = args;

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
