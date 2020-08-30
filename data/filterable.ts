import Kind, { Ap } from "../kind.ts";
import { AssertEquals } from "../test/asserts.ts";

export interface Filterable<T extends Kind> {
  filter: <A>(
    pred: (x: A) => boolean,
    ta: Ap<T, A>,
  ) => Ap<T, A>;
}

export default Filterable;

export const testFilterable = <T extends Kind, A>(
  { filter, assertEquals, a, b, f, g }:
    & Filterable<T>
    & {
      assertEquals: AssertEquals;
      f: (a: A) => boolean;
      g: (a: A) => boolean;
      a: A;
      b: A;
    },
) => {
  assertEquals(
    filter<A>((x: A) => f(x) && g(x), a),
    filter<A>(g, filter(f, a)),
    "filterable distributivity identity law",
  );

  assertEquals(
    filter<A>((a: A) => true, a),
    a,
    "filterable identity law",
  );

  assertEquals(
    filter<A>((a: A) => false, a),
    filter<A>((a: A) => false, b),
    "filterable annihilation law",
  );
};
