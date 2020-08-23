import kind, { ap } from "../kind.ts";
import Functor from "../data/functor.ts";

export interface Apply<T extends kind> extends Functor<T> {
  ap: <A, B>(
    tf: ap<T, (x: A) => B>,
    ta: ap<T, A>,
  ) => ap<T, B>;
}

export default Apply;
