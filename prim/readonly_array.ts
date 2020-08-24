import Kind, { _, Ap } from "../kind.ts";
import * as array from "./array.ts";

export interface ReadonlyArrayKind extends Kind {
  $: ReadonlyArray<this[_]>;
}

export default ReadonlyArrayKind;

export const empty = array.empty as <A>() => Ap<ReadonlyArrayKind, A>;

export const equals = array.equals as <A>(
  x: Ap<ReadonlyArrayKind, A>,
  y: Ap<ReadonlyArrayKind, A>,
) => boolean;

export const concat = array.concat as unknown as <A>(
  x: Ap<ReadonlyArrayKind, A>,
  y: Ap<ReadonlyArrayKind, A>,
) => Ap<ReadonlyArrayKind, A>;

export const invert = array.invert as unknown as <A>(
  t: Ap<ReadonlyArrayKind, A>,
) => Ap<ReadonlyArrayKind, A>;

export const map = array.map as unknown as <A, B>(
  f: (x: A) => B,
  t: Ap<ReadonlyArrayKind, A>,
) => Ap<ReadonlyArrayKind, B>;

export const reduce = array.reduce as <A, B>(
  f: (x: A, y: B) => A,
  x: A,
  u: Ap<ReadonlyArrayKind, B>,
) => A;

export const filter = array.filter as unknown as <A>(
  pred: (x: A) => boolean,
  ta: Ap<ReadonlyArrayKind, A>,
) => Ap<ReadonlyArrayKind, A>;

export const ap = array.ap as unknown as <A, B>(
  tf: Ap<ReadonlyArrayKind, ((x: A) => B)>,
  ta: Ap<ReadonlyArrayKind, A>,
) => Ap<ReadonlyArrayKind, B>;

export const of = array.of as unknown as <A>(x: A) => Ap<ReadonlyArrayKind, A>;

export const chain = array.chain as unknown as <A, B>(
  f: (x: A) => Ap<ReadonlyArrayKind, B>,
  t: Ap<ReadonlyArrayKind, A>,
) => Ap<ReadonlyArrayKind, B>;

export const join = array.join as unknown as <A>(
  tt: Ap<ReadonlyArrayKind, Ap<ReadonlyArrayKind, A>>,
) => Ap<ReadonlyArrayKind, A>;
