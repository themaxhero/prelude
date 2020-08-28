import Kind, { Ap } from "../kind.ts";
import Chain from "./chain.ts";

export interface Next<T> {
  tag: "next";
  value: T;
}

export interface Done<T> {
  tag: "done";
  value: T;
}

export interface ChainRec<T extends Kind> extends Chain<T> {
  chainRec: <A, B>(
    f: (
      n: (a: A) => Next<A>,
      d: (b: B) => Done<B>,
      a: A,
    ) => Ap<T, Next<A> | Done<B>>,
    a: A,
  ) => Ap<T, B>;
}

export default ChainRec;
