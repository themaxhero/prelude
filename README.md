# prelude

_a base library for functional programming in [deno](http://deno.land/)_

## Roadmap

:warning:	WATCH OUT!

- semver won't be enforced until v1.0.0
- partial application and other tuple related functions won't be available until deno supports [TypeScript 4.0](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html)

### Goals

- provide [interfaces](https://github.com/kress95/prelude/blob/master/static-land.ts) corresponding [static-land spec](https://github.com/rpominov/static-land) type classes and factory functions for implementing its instances
- provide good replacement for libraries like [fp-ts](https://github.com/gcanti/fp-ts), [ramda](https://github.com/ramda/ramda), [hkts](https://github.com/pelotom/hkts) and [lodash](https://github.com/lodash/lodash)
- provide interfaces for additional [purescript](https://github.com/purescript/purescript) based type classes
- provide some basic (primitives, Maybe, Either, etc...) instances for existing type classes
- deno idioms and support comes first, then compatibility for browser and node

### Non-Goals

- break compatibility with static-land
- provide every haskell/purescript equivalent type class and instance

## Documentation

Is currently a work in progress and not a priority until instances for most primitive types are implemented.

## Known limitations

- every kind is limited to a single parameter (but kinds can yield kinds)
- testing kind applications is [weird](https://github.com/kress95/prelude/blob/master/kind_test.ts)
- a useless expression is required to check type class instances:

```ts
(():
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
  & Monad<ArrayKind> => ({
  equals,
  empty,
  concat,
  map,
  reduce,
  filter,
  ap,
  of,
  chain,
  join,
  invert,
}));
```

## Related work

- [encoding higher kinded types in typescript without declaration merging](https://gist.github.com/ENvironmentSet/1662a140f99381bc85fd6be51ecdcbb5)
- inspired by [hkts](https://github.com/pelotom/hkts), [fp-ts](https://github.com/gcanti/fp-ts) and [purescript](https://github.com/purescript/purescript)

## For Developers

If you want to contribute to prelude:

1. clone this repository
2. make sure you have deno installed in your path
3. install the `pre-commit` running:
    - on windows: `.\scripts\hook` from the repository root directory
    - on linux/unix-likes: `./scripts/hook` from the repository root directory
4. run scripts from the repository root directory

Thanks!
