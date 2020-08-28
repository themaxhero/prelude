export interface Kind<B = unknown, A = unknown> {
  _: A;
  $: B;
}

export type Kind2<A = unknown, B = unknown, C = unknown> = Kind<Kind<C, B>, A>;

export default Kind;

export type _ = "_";

type $ = "$";

export type Ap<T extends Kind, A = unknown> = (T & { _: A })[$];

export type Ap2<T extends Kind2, A = unknown, B = unknown> = Ap<Ap<T, A>, B>;

export interface Flip<T extends Kind2> extends Kind {
  $: FlipKind<T, this[_]>;
}

interface FlipKind<T extends Kind2<A>, A> extends Kind {
  $: Ap2<T, this[_], A>;
}
