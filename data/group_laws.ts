import { AssertEquals } from "../test/asserts.ts";
import { testMonoid } from "./monoid_laws.ts";
import Group from "./group.ts";

export const testGroup = <A>(
  { invert, ...args }: Group<A> & {
    assertEquals: AssertEquals;
    a: A;
    b: A;
    c: A;
  },
) => {
  testMonoid<A>(args);

  const { empty, concat, assertEquals, a } = args;

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
