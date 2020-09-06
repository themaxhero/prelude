import { AssertEquals } from "../test/asserts.ts";
import { testSetoid } from "./setoid_laws.ts";
import Ord from "./ord.ts";

export const testOrd = <A>(
  args: Ord<A> & {
    assertEquals: AssertEquals;
    a: A;
    b: A;
    c: A;
  },
) => {
  testSetoid<A>(args);

  const { lte, equals, assertEquals, a, b, c } = args;

  assertEquals(
    lte(a, b) || lte(b, a),
    true,
    "ord totality law",
  );

  assertEquals(
    lte(a, b) && lte(b, a) ? equals(a, b) : !equals(a, b),
    true,
    "ord antisymmetry law",
  );

  assertEquals(
    lte(a, b) && lte(b, c) ? lte(a, c) : lte(a, c),
    true,
    "ord transitivity law",
  );
};
