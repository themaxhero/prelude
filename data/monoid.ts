import Semigroup from "./semigroup.ts";
import { AssertEquals } from "../test/asserts.ts";

export interface Monoid<T> extends Semigroup<T> {
  empty: () => T;
}

export default Monoid;

export const assertMonoid = <T>(
  { concat, empty, assertEquals, a }:
    & Monoid<T>
    & { assertEquals: AssertEquals; a: T },
) => {
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
