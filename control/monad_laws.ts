import Kind, { Ap } from "../kind.ts";
import { AssertEquals } from "../test/asserts.ts";
import { testApplicative } from "./applicative_laws.ts";
import { testChain } from "./chain_laws.ts";
import Monad from "./monad.ts";

export const testMonad = <T extends Kind, A, B, C>(
  { fh: u, ...args }:
    & Monad<T>
    & {
      assertEquals: AssertEquals;
      a: A;
      d: B;
      ta: Ap<T, A>;
      f: (b: B) => C;
      g: (a: A) => B;
      ff: Ap<T, (b: B) => C>;
      fg: Ap<T, (a: A) => B>;
      fh: Ap<T, (x: C) => B>;
    },
) => {
  testApplicative<T, A, B, C>(args);
  testChain<T, A, B, C>(args);

  const { of, chain, assertEquals, g, a } = args;

  assertEquals(
    chain<A, B>(g, of<A>(a)),
    g(a),
    "monad left identity law",
  );

  assertEquals(
    chain<(x: C) => B, (x: C) => B>(of, u),
    u,
    "monad right identity law",
  );

  // TODO: test join
};
