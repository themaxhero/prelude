export interface kind<B = unknown, A = unknown> {
  _: A;
  $: B;
}

export default kind;

export type _ = "_";

type $ = "$";

export type ap<T extends kind, A = unknown> = (T & { _: A })[$];

export interface flip<T extends kind<kind>> extends kind {
  $: FlipKind<T, this[_]>;
}

interface FlipKind<T extends kind<kind, A>, A> extends kind {
  $: ap<ap<T, this[_]>, A>;
}
