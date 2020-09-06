import Kind, { Ap } from "../kind.ts";

export interface Filterable<T extends Kind> {
  filter: <A>(
    pred: (x: A) => boolean,
    ta: Ap<T, A>,
  ) => Ap<T, A>;
}

export default Filterable;
