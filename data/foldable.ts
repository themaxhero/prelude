import Kind, { Ap } from "../kind.ts";
import { AssertEquals } from "../test/asserts.ts";

export interface Foldable<T extends Kind> {
  reduce: <A, B>(
    f: (x: B, y: A) => B,
    x: B,
    u: Ap<T, A>,
  ) => B;
}

export default Foldable;

export const testFoldable = <T extends Kind, A, B, C>(
  { assertEquals, reduce, a, b, f }:
    & Foldable<T>
    & {
      assertEquals: AssertEquals;
      a: Ap<T, A>;
      b: B;
      f: (x: B, y: A) => B;
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
