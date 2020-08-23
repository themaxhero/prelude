import Setoid from "./setoid.ts";

export interface Ord<T> extends Setoid<T> {
  lte: (x: T, y: T) => boolean;
}

export default Ord;
