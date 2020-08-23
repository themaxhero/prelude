import kind, { ap } from "../kind.ts";

export interface Functor<T extends kind> {
  map: <A, B>(
    f: (x: A) => B,
    t: ap<T, A>,
  ) => ap<T, B>;
}

export default Functor;
