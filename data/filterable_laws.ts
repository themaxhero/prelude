import Kind from "../kind.ts";
import { AssertEquals } from "../test/asserts.ts";
import Filterable from "./filterable.ts";

export const testFilterable = <T extends Kind, A>(
  args: Filterable<T> & {
    assertEquals: AssertEquals;
    a: A;
    b: A;
    cka: (a: A) => boolean;
    ckb: (a: A) => boolean;
  },
) => {
  const { filter, assertEquals, a, b, cka: f, ckb: g } = args;

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
