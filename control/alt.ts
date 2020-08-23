import kind, { ap } from "../kind.ts";
import Functor from "../data/functor.ts";

export interface Alt<T extends kind> extends Functor<T> {
  alt: <A>(
    x: ap<T, A>,
    y: ap<T, A>,
  ) => ap<T, A>;
}

export default Alt;
