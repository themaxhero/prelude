import Kind, { Ap } from "../kind.ts";
import Alt, { testAlt } from "./alt.ts";
import { AssertEquals } from "../test/asserts.ts";

export interface Plus<T extends Kind> extends Alt<T> {
  zero: <A>() => Ap<T, A>;
}

export default Plus;

export const testPlus = <T extends Kind, A, B, C>(
  args: Plus<T> & {
    assertEquals: AssertEquals;
    tA1: Ap<T, A>;
    tA2: Ap<T, A>;
    tA3: Ap<T, A>;
    fAB1: (a: A) => B;
    fBC1: (b: B) => C;
  },
) => {
  testAlt<T, A, B, C>(args);

  const { zero, alt, map, assertEquals, tA1: a, fAB1: f } = args;

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
