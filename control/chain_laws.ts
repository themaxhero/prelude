import Kind, { Ap } from "../kind.ts";
import { AssertEquals } from "../test/asserts.ts";
import { testApply } from "./apply_laws.ts";
import Chain from "./chain.ts";

export const testChain = <T extends Kind, A, B, C>(
  args: Chain<T> & {
    assertEquals: AssertEquals;
    ta: Ap<T, A>;
    f: (a: A) => B;
    g: (b: B) => C;
    ff: Ap<T, (x: A) => B>;
    fg: Ap<T, (x: B) => C>;
  },
) => {
  testApply<T, A, B, C>(args);

  const { chain, assertEquals, ta: u, f, g } = args;

  assertEquals(
    chain(g, chain(f, u)),
    chain((x: A) => chain(g, f(x)), u),
    "chain associativity law",
  );
};
