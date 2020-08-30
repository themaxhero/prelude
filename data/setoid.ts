import { Assert } from "../test/asserts.ts";

export interface Setoid<T> {
  equals: (x: T, y: T) => boolean;
}

export default Setoid;

export const assertSetoid = <T>(
  { equals, assert, a, b, c }:
    & Setoid<T>
    & { assert: Assert; a: T; b: T; c: T },
) => {
  assert(
    equals(a, a),
    "setoid reflexivity law",
  );

  assert(
    equals(a, b) === equals(b, a),
    "setoid symmetry law",
  );

  assert(
    equals(a, b) && equals(b, c) ? equals(a, c) : !equals(a, c),
    "setoid transitivity law",
  );
};
