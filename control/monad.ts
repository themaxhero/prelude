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
      a: Ap<T, (x: B) => A>;
      u: Ap<T, (x: C) => B>;
      v: Ap<T, C>;
      w: Ap<T, A>;
      f: (b: B) => A;
      g: (c: C) => B;
      h: (a: A) => B;
      i: (b: B) => C;
      x: B;
      y: C;
      z: A;
    },
) => {
  testApplicative<T, A, B, C>(args);

  testChain<T, A, B, C>({
    chain: args.chain,
    ap: args.ap,
    map: args.map,
    assertEquals: args.assertEquals,
    a: args.a,
    u: args.w,
    v: args.u,
    w: args.v,
    f: args.h,
    g: args.i,
    h: args.f,
    i: args.g,
  });

  const { chain, of, assertEquals, u, h: f, z: a } = args;

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
