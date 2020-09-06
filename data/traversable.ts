import Kind, { Ap } from "../kind.ts";
import Functor from "./functor.ts";
import Foldable from "./foldable.ts";
import Applicative from "../control/applicative.ts";

export interface Traversable<T extends Kind> extends Functor<T>, Foldable<T> {
  traverse: <U extends Kind, A, B>(
    a: Applicative<U>,
    f: (x: A) => Ap<U, B>,
    t: Ap<T, A>,
  ) => Ap<U, Ap<T, B>>;
}

export default Traversable;
