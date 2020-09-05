import { Kind2, Ap2 } from "../kind.ts";
import Semigroupoid, { testSemigroupoid } from "../control/semigroupoid.ts";
import { AssertEquals } from "../test/asserts.ts";

export interface Category<T extends Kind2> extends Semigroupoid<T> {
  id: <I, J>() => Ap2<T, I, J>;
}

export default Category;

export const testCategory = <T extends Kind2, A, B, C>(
  args: Category<T> & { assertEquals: AssertEquals; a: A; b: B; c: C },
) => {
  testSemigroupoid<T, A, B, C>(args);

  const { id, compose, assertEquals, a: a } = args;

  assertEquals(
    compose<A, A, A>(a, id<A, A>()),
    a,
    "category right identity law",
  );

  assertEquals(
    compose<A, A, A>(id<A, A>(), a),
    a,
    "category left identity law",
  );
};
