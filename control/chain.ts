import Kind, { Ap } from "../kind.ts";
import Apply from "./apply.ts";
import Functor from "../data/functor.ts";

export interface Chain<T extends Kind> extends Apply<T> {
  chain: <A, B>(
    f: (x: A) => Ap<T, B>,
    t: Ap<T, A>,
  ) => Ap<T, B>;
}

export default Chain;

export const deriveChain = <T extends Kind>(
  { chain, map, ...rest }:
    & Pick<Chain<T>, "chain">
    & Pick<Functor<T>, "map">,
): Chain<T> => ({
  ap: (uf, ux) => chain((f) => map(f, ux), uf),
  chain,
  map,
  ...rest,
});
