import kind, { ap } from "../kind.ts";
import Apply from "./apply.ts";
import Functor from "../data/functor.ts";

export interface Chain<T extends kind> extends Apply<T> {
  chain: <A, B>(
    f: (x: A) => ap<T, B>,
    t: ap<T, A>,
  ) => ap<T, B>;
}

export default Chain;

export const deriveChain = <T extends kind>(
  { chain, map, ...rest }:
    & Pick<Chain<T>, "chain">
    & Pick<Functor<T>, "map">,
): Chain<T> => ({
  ap: (uf, ux) => chain((f) => map(f, ux), uf),
  chain,
  map,
  ...rest,
});
