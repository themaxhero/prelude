import kind, { ap } from "../kind.ts";
import Functor from "../data/functor.ts";

export interface Extend<T extends kind> extends Functor<T> {
  extend: <A, B>(
    f: (t: ap<T, A>) => B,
    t: ap<T, A>,
  ) => ap<T, B>;
}

export default Extend;
