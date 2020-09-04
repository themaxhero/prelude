import Setoid, { testSetoid } from "./setoid.ts";
import { AssertEquals } from "../test/asserts.ts";

export interface Ord<T> extends Setoid<T> {
  lte: (x: T, y: T) => boolean;
}

export default Ord;

export const testOrd = <A>(
  args: Ord<A> & {
    assertEquals: AssertEquals;
    a1: A;
    a2: A;
    a3: A;
  },
) => {
  testSetoid<A>(args);

  const { lte, equals, assertEquals, a1: a, a2: b, a3: c } = args;

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
