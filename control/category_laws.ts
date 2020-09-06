import { Kind2 } from "../kind.ts";
import { AssertEquals } from "../test/asserts.ts";
import { testSemigroupoid } from "../control/semigroupoid_laws.ts";
import Category from "./category.ts";

export const testCategory = <T extends Kind2, A, B, C>(
  args: Category<T> & { assertEquals: AssertEquals; a: A; b: B; c: C },
) => {
  testSemigroupoid<T, A, B, C>(args);

  const { id, compose, assertEquals, a } = args;

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
