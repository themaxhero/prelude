import kind, { ap } from "../kind.ts";
import Applicative from "./applicative.ts";
import Chain, { deriveChain as deriveChain } from "./chain.ts";

export interface Monad<T extends kind> extends Applicative<T>, Chain<T> {
  join: <A>(tt: ap<T, ap<T, A>>) => ap<T, A>;
}

export default Monad;

export const deriveMonad = <T extends kind<kind>>(
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
