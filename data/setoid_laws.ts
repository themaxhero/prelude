import { AssertEquals } from "../test/asserts.ts";
import Setoid from "./setoid.ts";

export const testSetoid = <A>(
  { equals, assertEquals, a, b, c }: Setoid<A> & {
    assertEquals: AssertEquals;
    a: A;
    b: A;
    c: A;
  },
) => {
  assertEquals(
    equals(a, a),
    true,
    "setoid reflexivity law",
  );

  assertEquals(
    equals(a, b) === equals(b, a),
    true,
    "setoid symmetry law",
  );

  assertEquals(
    equals(a, b) && equals(b, c) ? equals(a, c) : !equals(a, c),
    true,
    "setoid transitivity law",
  );
};
