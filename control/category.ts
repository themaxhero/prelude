import { Kind2, Ap2 } from "../kind.ts";
import Semigroupoid, { testSemigroupoid } from "../control/semigroupoid.ts";
import { AssertEquals } from "../test/asserts.ts";

export interface Category<T extends Kind2> extends Semigroupoid<T> {
  id: <I, J>() => Ap2<T, I, J>;
}

export default Category;

export const testCategory = <T extends Kind2, I, J, K>(
  args:
    & Category<T>
    & { assertEquals: AssertEquals; a: I; b: J; c: K },
) => {
  const { id, compose, assertEquals, a } = args;

  assertEquals(
    compose<I, I, I>(a, id<I, I>()),
    a,
    "category right identity law",
  );

  assertEquals(
    compose<I, I, I>(id<I, I>(), a),
    a,
    "category left identity law",
  );
};
