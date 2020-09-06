import Monoid from "./monoid.ts";

export interface Group<T> extends Monoid<T> {
  invert: (x: T) => T;
}

export default Group;
