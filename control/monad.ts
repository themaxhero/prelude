import Kind, { Ap } from "../kind.ts";
import Applicative, { testApplicative } from "./applicative.ts";
import Chain, { deriveChain as deriveChain, testChain } from "./chain.ts";
import { AssertEquals } from "../test/asserts.ts";

export interface Monad<T extends Kind> extends Applicative<T>, Chain<T> {
  join: <A>(tt: Ap<T, Ap<T, A>>) => Ap<T, A>;
}

export default Monad;

export const deriveMonad = <T extends Kind>(
  { of, chain, ...rest }:
    & Pick<Applicative<T>, "of">
    & Pick<Chain<T>, "chain">,
): Monad<T> => ({
  ...deriveChain({
    chain,
    map: (f, t) => chain((x) => of(f(x)), t),
  }),
  join: (tt) => chain((t) => t, tt),
  of,
  ...rest,
});

export const testMonad = <T extends Kind, A, B, C>(
  args:
    & Monad<T>
    & {
      assertEquals: AssertEquals;
      a1: A;
      b1: B;
      tA1: Ap<T, A>;
      fAB1: (a: A) => B;
      fBC1: (b: B) => C;
      tfAB1: Ap<T, (x: A) => B>;
      tfBC1: Ap<T, (x: B) => C>;
      tfCB1: Ap<T, (x: C) => B>;
    },
) => {
  testApplicative<T, A, B, C>(args);
  testChain<T, A, B, C>(args);

  const { chain, of, assertEquals, tfCB1: u, fAB1: f, a1: a } = args;

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
