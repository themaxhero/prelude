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
  args: Filterable<T> & {
    assertEquals: AssertEquals;
    a1: A;
    a2: A;
    fABool1: (a: A) => boolean;
    fABool2: (a: A) => boolean;
  },
) => {
  const { filter, assertEquals, a1: a, a2: b, fABool1: f, fABool2: g } = args;

  assertEquals(
    filter<A>((x: A) => f(x) && g(x), a),
    filter<A>(g, filter<A>(f, a)),
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
