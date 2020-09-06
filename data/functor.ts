import Kind, { Ap } from "../kind.ts";

export interface Functor<T extends Kind> {
  map: <A, B>(
    f: (x: A) => B,
    t: Ap<T, A>,
  ) => Ap<T, B>;
}

export default Functor;
