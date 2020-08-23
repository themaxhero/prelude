export interface Setoid<T> {
  equals: (x: T, y: T) => boolean;
}

export default Setoid;
