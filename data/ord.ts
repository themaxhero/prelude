import Setoid, { assertSetoid } from "./setoid.ts";
import { Assert } from "../test/asserts.ts";

export interface Ord<T> extends Setoid<T> {
  lte: (x: T, y: T) => boolean;
}

export default Ord;

export const assertOrd = <T>(
  args: Ord<T> & { assert: Assert; a: T; b: T; c: T },
) => {
  assertSetoid(args);

  const { lte, equals, assert, a, b, c } = args;

  assert(
    lte(a, b) || lte(b, a),
    "ord totality law",
  );
  assert(
    lte(a, b) && lte(b, a) ? equals(a, b) : !equals(a, b),
    "ord antisymmetry law",
  );
  assert(
    lte(a, b) && lte(b, c) ? lte(a, c) : lte(a, c),
    "ord transitivity law",
  );
};
