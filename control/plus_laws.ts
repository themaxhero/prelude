import Kind, { Ap } from "../kind.ts";
import { AssertEquals } from "../test/asserts.ts";
import { testAlt } from "./alt_laws.ts";
import Plus from "./plus.ts";

export const testPlus = <T extends Kind, A, B, C>(
  { zero, ...args }: Plus<T> & {
    assertEquals: AssertEquals;
    ta: Ap<T, A>;
    tb: Ap<T, A>;
    tc: Ap<T, A>;
    f: (b: B) => C;
    g: (a: A) => B;
  },
) => {
  testAlt<T, A, B, C>(args);

  const { alt, map, assertEquals, ta: a, g } = args;

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
    map<A, B>(g, zero<A>()),
    zero<A>(),
    "plus annihilation law",
  );
};
