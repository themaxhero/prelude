import Kind, { Ap } from "../kind.ts";
import { AssertEquals } from "../test/asserts.ts";
import { testApply } from "./apply_laws.ts";
import Chain from "./chain.ts";

export const testChain = <T extends Kind, A, B, C>(
  { chain, ...args }: Chain<T> & {
    assertEquals: AssertEquals;
    ta: Ap<T, A>;
    f: (b: B) => C;
    g: (a: A) => B;
    ff: Ap<T, (b: B) => C>;
    fg: Ap<T, (a: A) => B>;
  },
) => {
  testApply<T, A, B, C>(args);

  const { assertEquals, ta: a, f, g } = args;

  assertEquals(
    chain(f, chain(g, a)),
    chain((x: A) => chain(f, g(x)), a),
    "chain associativity law",
  );
};
