import Kind, { Ap } from "../kind.ts";
import { AssertEquals } from "../test/asserts.ts";
import Foldable from "./foldable.ts";

export const testFoldable = <T extends Kind, A, B>(
  { assertEquals, reduce, ta: a, d: b, n: f }: Foldable<T> & {
    assertEquals: AssertEquals;
    ta: Ap<T, A>;
    d: B;
    n: (x: B, y: A) => B;
  },
) => {
  assertEquals(
    reduce(f, b, a),
    (<A, B>(f: (x: A, y: B) => A, x: A, u: Ap<T, B>): A =>
      reduce<B, B[]>(
        (acc: B[], y: B) => acc.concat([y]),
        [] as B[],
        u,
      ).reduce<A>(f, x))(f, b, a),
    "foldable equivalence law",
  );
};
