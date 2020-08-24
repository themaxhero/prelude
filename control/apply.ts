import Kind, { Ap } from "../kind.ts";
import Functor from "../data/functor.ts";

export interface Apply<T extends Kind> extends Functor<T> {
  ap: <A, B>(
    tf: Ap<T, (x: A) => B>,
    ta: Ap<T, A>,
  ) => Ap<T, B>;
}

export default Apply;
