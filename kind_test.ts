import Kind, { _, Ap, Flip } from "./kind.ts";
import { testType } from "./test/support.ts";

type a = symbol;
type b = void;
type c = never;

// deno-lint-ignore no-explicit-any
const any = undefined as any;

const assert = <T>(_: T) => () => {};

interface FixKind<T> extends Kind {
  _: T;
  $: this[_];
}

interface IdKind extends Kind {
  $: this[_];
}

interface IgnoreKind<A> extends Kind {
  $: A;
}

interface AlwaysKind extends Kind {
  $: IgnoreKind<this[_]>;
}

interface AlwaysAlwaysKind extends Kind {
  $: IgnoreKind<IgnoreKind<this[_]>>;
}

Deno.test(
  "binding types with '_'",
  testType<a>(any as Ap<FixKind<a>, b>),
);

Deno.test(
  "apply 'Ap' with Kind (a -> a)",
  testType<a>(any as Ap<IdKind, a>),
);

Deno.test(
  "apply 'Ap' with Kind (a -> b -> a)",
  testType<a>(any as Ap<Ap<AlwaysKind, a>, b>),
);

Deno.test(
  "apply 'Flip' with Kind (a -> b -> a)",
  testType<a>(any as Ap<Ap<Flip<AlwaysKind>, b>, a>),
);

Deno.test(
  "apply 'Flip' twice with Kind (a -> b -> c -> a)",
  testType<a>(any as Ap<Ap<Flip<Ap<Flip<AlwaysAlwaysKind>, c>>, b>, a>),
);
