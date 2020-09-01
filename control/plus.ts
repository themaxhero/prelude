import Kind, { Ap } from "../kind.ts";
import Alt, { testAlt } from "./alt.ts";
import { AssertEquals } from "../test/asserts.ts";

export interface Plus<T extends Kind> extends Alt<T> {
  zero: <A>() => Ap<T, A>;
}

export default Plus;

export const testPlus = <T extends Kind, A, B, C>(
  args:
    & Plus<T>
    & {
      assertEquals: AssertEquals;
      a: Ap<T, A>;
      b: Ap<T, A>;
      c: Ap<T, A>;
      f: (a: A) => B;
      g: (b: B) => C;
    },
) => {
  testAlt<T, A, B, C>(args);

  const { zero, alt, map, assertEquals, a, f } = args;

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
