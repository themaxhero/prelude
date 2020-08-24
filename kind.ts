export interface Kind<B = unknown, A = unknown> {
  _: A;
  $: B;
}

export default Kind;

export type _ = "_";

type $ = "$";

export type Ap<T extends Kind, A = unknown> = (T & { _: A })[$];

export interface Flip<T extends Kind<Kind>> extends Kind {
  $: FlipKind<T, this[_]>;
}

interface FlipKind<T extends Kind<Kind, A>, A> extends Kind {
  $: Ap<Ap<T, this[_]>, A>;
}
