import Kind, { Ap } from "../kind.ts";
import Functor from "../data/functor.ts";

export interface Extend<T extends Kind> extends Functor<T> {
  extend: <A, B>(
    f: (t: Ap<T, A>) => B,
    t: Ap<T, A>,
  ) => Ap<T, B>;
}

export default Extend;
