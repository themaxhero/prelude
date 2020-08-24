import Kind, { Ap } from "../kind.ts";
import Functor from "../data/functor.ts";

export interface Alt<T extends Kind> extends Functor<T> {
  alt: <A>(
    x: Ap<T, A>,
    y: Ap<T, A>,
  ) => Ap<T, A>;
}

export default Alt;
