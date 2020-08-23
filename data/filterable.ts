import kind, { ap } from '../kind.ts';

export interface Filterable<T extends kind> {
  filter: <A>(
    pred: (x: A) => boolean,
    ta: ap<T, A>,
  ) => ap<T, A>;
}

export default Filterable;
