import { AssertEquals } from "../test/asserts.ts";

export interface Setoid<T> {
  equals: (x: T, y: T) => boolean;
}

export default Setoid;

export const testSetoid = <A>(
  args: Setoid<A> & {
    assertEquals: AssertEquals;
    a: A;
    b: A;
    c: A;
  },
) => {
  const { equals, assertEquals, a: a, b: b, c: c } = args;

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
