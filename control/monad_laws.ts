import Kind, { Ap } from "../kind.ts";
import { AssertEquals } from "../test/asserts.ts";
import { testApplicative } from "./applicative_laws.ts";
import { testChain } from "./chain_laws.ts";
import Monad from "./monad.ts";

export const testMonad = <T extends Kind, A, B, C>(
  args:
    & Monad<T>
    & {
      assertEquals: AssertEquals;
      a: A;
      d: B;
      ta: Ap<T, A>;
      f: (a: A) => B;
      g: (b: B) => C;
      ff: Ap<T, (x: A) => B>;
      fg: Ap<T, (x: B) => C>;
      fk: Ap<T, (x: C) => B>;
    },
) => {
  testApplicative<T, A, B, C>(args);
  testChain<T, A, B, C>(args);

  const { chain, of, assertEquals, fk: u, f, a } = args;

  assertEquals(
    chain<A, B>(f, of<A>(a)),
    f(a),
    "monad left identity law",
  );

  assertEquals(
    chain<(x: C) => B, (x: C) => B>(of, u),
    u,
    "monad right identity law",
  );
};
