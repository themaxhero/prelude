import kind, { _, ap, flip } from "./kind.ts";

type a = symbol;
type b = void;
type c = never;

// deno-lint-ignore no-explicit-any
const any = undefined as any;

const assert = <T>(_: T) => () => {};

interface FixKind<T> extends kind {
  _: T;
  $: this[_];
}

interface IdKind extends kind {
  $: this[_];
}

interface IgnoreKind<A> extends kind {
  $: A;
}

interface AlwaysKind extends kind {
  $: IgnoreKind<this[_]>;
}

interface AlwaysAlwaysKind extends kind {
  $: IgnoreKind<IgnoreKind<this[_]>>;
}

Deno.test(
  "binding types with '_'",
  assert<a>(any as ap<FixKind<a>, b>),
);

Deno.test(
  "apply 'ap' with kind (a -> a)",
  assert<a>(any as ap<IdKind, a>),
);

Deno.test(
  "apply 'ap' with kind (a -> b -> a)",
  assert<a>(any as ap<ap<AlwaysKind, a>, b>),
);

Deno.test(
  "apply 'flip' with kind (a -> b -> a)",
  assert<a>(any as ap<ap<flip<AlwaysKind>, b>, a>),
);

Deno.test(
  "apply 'flip' twice with kind (a -> b -> c -> a)",
  assert<a>(any as ap<ap<flip<ap<flip<AlwaysAlwaysKind>, c>>, b>, a>),
);
