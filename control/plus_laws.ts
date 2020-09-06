import Kind, { Ap } from "../kind.ts";
import { AssertEquals } from "../test/asserts.ts";
import { testAlt } from "./alt_laws.ts";
import Plus from "./plus.ts";

export const testPlus = <T extends Kind, A, B, C>(
  args: Plus<T> & {
    assertEquals: AssertEquals;
    ta: Ap<T, A>;
    tb: Ap<T, A>;
    tc: Ap<T, A>;
    f: (a: A) => B;
    g: (b: B) => C;
  },
) => {
  testAlt<T, A, B, C>(args);

  const { zero, alt, map, assertEquals, ta: a, f } = args;

  assertEquals(
    alt<A>(a, zero<A>()),
    a,
    "plus right identity law",
  );

  assertEquals(
    alt<A>(zero<A>(), a),
    a,
    "plus left identity law",
  );

  assertEquals(
    map<A, B>(f, zero<A>()),
    zero<A>(),
    "plus annihilation law",
  );
};
