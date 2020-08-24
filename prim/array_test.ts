import { _, Ap } from "../kind.ts";
import { testType } from "../test/support.ts";
import Monoid from "../data/monoid.ts";
import Setoid from "../data/setoid.ts";
import Semigroup from "../data/semigroup.ts";
import Group from "../data/group.ts";
import Functor from "../data/functor.ts";
import Foldable from "../data/foldable.ts";
import Filterable from "../data/filterable.ts";
import Apply from "../control/apply.ts";
import Applicative from "../control/applicative.ts";
import Chain from "../control/chain.ts";
import Monad from "../control/monad.ts";
import ArrayKind, {
  empty,
  equals,
  concat,
  invert,
  map,
  reduce,
  filter,
  ap,
  of,
  chain,
  join,
} from "./array.ts";

Deno.test(
  "type class instances",
  testType<
    & Monoid<Ap<ArrayKind, unknown>>
    & Setoid<Ap<ArrayKind, unknown>>
    & Semigroup<Ap<ArrayKind, unknown>>
    & Group<Ap<ArrayKind, unknown>>
    & Functor<ArrayKind>
    & Foldable<ArrayKind>
    & Filterable<ArrayKind>
    & Apply<ArrayKind>
    & Applicative<ArrayKind>
    & Chain<ArrayKind>
    & Monad<ArrayKind>
  >({
    empty,
    equals,
    concat,
    invert,
    map,
    reduce,
    filter,
    ap,
    of,
    chain,
    join,
  }),
);
