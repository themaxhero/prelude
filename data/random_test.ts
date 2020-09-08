import {
  Random,
  Factory,
  Weighted,
  integer,
  float,
  uniform,
  weighted,
  of,
  ap,
  array,
  pair,
  map,
  chain,
  join,
  lazy,
  minInt,
  maxInt,
  initialSeed,
  independentSeed,
} from "./random.ts";
import { assertEquals } from "https://deno.land/std@0.68.0/testing/asserts.ts";
import { testMonad } from "../control/monad_laws.ts";
import Kind, { _ } from "../kind.ts";

export interface FactoryKind extends Kind {
  $: Factory<this[_]>;
}

Deno.test(
  "aaa",
  () => {
    testMonad<FactoryKind, number, string, boolean>({
      join,
      chain,
      of,
      ap,
      map,
      assertEquals,
      a: 1,
      d: "1",
      ta: of(1),
      f: (str) => str === "1",
      g: (num) => num.toString(),
      ff: of((str) => str === "1"),
      fg: of((num) => num.toString()),
      fh: of as any,
    });
  },
);
