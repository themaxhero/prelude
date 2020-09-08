import Kind, { _ } from "../kind.ts";
import { map as mapArray, reduce as reduceArray } from "../prim/array.ts";

// The magic constants here are from Numerical Recipes, inlined for perf reasons.

export interface Seed {
  state: number;
  increment: number;
}

export interface Random<T> {
  value: T;
  seed: Seed;
}

export interface Factory<T> {
  (seed: Seed): Random<T>;
}

export interface Weighted<T> {
  weight: number;
  value: T;
}

export const integer = (
  a = minInt,
  b = maxInt,
): Factory<number> => {
  const lo = min(a, b);
  const hi = max(a, b);

  const range = (hi - lo) + 1;

  // essentially: period % max
  const threshhold = (((-range) >>> 0) % range) >>> 0;

  return (seed0) => {
    const peel0 = peel(seed0.state);
    const seed1 = next(seed0);

    // fast path for power of 2
    if ((range & (range - 1)) === 0) {
      return {
        value: ((peel0 & (range - 1)) >>> 0) + lo,
        seed: seed1,
      };
    } else {
      let x = peel0;
      let seedN = seed1;

      // in practice this loops almost never
      while (x < threshhold) {
        x = peel(seedN.state);
        seedN = next(seedN);
      }

      return {
        value: (x + lo) % range,
        seed: seedN,
      };
    }
  };
};

export const float = (min = 0, max = 1): Factory<number> => {
  const range = abs(max - min);

  return (seed0) => {
    const seed1 = next(seed0);

    const n0 = peel(seed0.state);
    const n1 = peel(seed1.state);

    // Get a uniformly distributed IEEE-754 double between 0.0 and 1.0
    const hi = (n0 & 0x03FFFFFF) * 1.0;
    const lo = (n1 & 0x07FFFFFF) * 1.0;

    // These magic constants are 2^27 and 2^53
    const val = ((hi * 134217728.0) + lo) / 9007199254740992.0;

    // Scale it into our range
    const scale = (val * range) + min;

    return {
      value: scale,
      seed: seed1,
    };
  };
};

export const uniform = <T>(value: T, values: T[]): Factory<T> =>
  weighted(addOne(value), mapArray(addOne, values));

export const weighted = <T>(
  first: Weighted<T>,
  others: Weighted<T>[],
): Factory<T> => {
  const total = normalize(first) + sum(mapArray(normalize, others));
  return map((c) => getByWeight(first, others, c), float(0, total));
};

export const of = <T>(value: T): Factory<T> => (seed) => ({ value, seed });

export const array = <T>(length: number, factory: Factory<T>): Factory<T[]> =>
  (seed0) => {
    const result: T[] = Array(length);

    let seedN = seed0;

    for (let i = 0; i < length; i++) {
      const { value, seed } = factory(seedN);
      result[i] = value;
      seedN = seed;
    }

    return { value: result, seed: seedN };
  };

export const pair = <A, B>(
  factoryA: Factory<A>,
  factoryB: Factory<B>,
): Factory<[A, B]> =>
  (seed0) => {
    const { value: a, seed: seed1 } = factoryA(seed0);
    const { value: b, seed: seed2 } = factoryB(seed1);
    return { value: [a, b], seed: seed2 };
  };

export const ap = <A, B>(
  tf: Factory<(x: A) => B>,
  ta: Factory<A>,
): Factory<B> =>
  chain<(x: A) => B, B>(
    (f) => map<A, B>((a) => f(a), ta),
    tf,
  );

export const map = <A, B>(fn: (a: A) => B, factory: Factory<A>): Factory<B> =>
  (seed0) => {
    const { value: a, seed } = factory(seed0);
    return { value: fn(a), seed };
  };

export const chain = <A, B>(
  f: (x: A) => Factory<B>,
  t: Factory<A>,
): Factory<B> =>
  (seed0) => {
    const { value: a, seed: seed1 } = t(seed0);
    const g = f(a);
    return g(seed1);
  };

const id = <T>(value: T): T => value;

export const join = <A>(tt: Factory<Factory<A>>): Factory<A> => {
  return chain<Factory<A>, A>(id, tt);
};

export const lazy = <T>(f: () => Factory<T>): Factory<T> => (seed) => f()(seed);

export const minInt = -2147483648;

export const maxInt = 2147483647;

export const initialSeed = (x: number): Seed => ({
  state: (1013904223 + x) >>> 0,
  increment: 1013904223,
});

export const independentSeed: Factory<Seed> = (seed0) => {
  // Although it probably doesn't hold water theoretically, xor two
  // random numbers to make an increment less likely to be
  // pathological. Then make sure that it's odd, which is required.
  // Next make sure it is positive. Finally step it once before use.
  const { value: state, seed: seed1 } = gen(seed0);
  const { value: a, seed: seed2 } = gen(seed1);
  const { value: b, seed: seed3 } = gen(seed2);

  return {
    value: { state, increment: ((b ^ a) | 1) >>> 0 },
    seed: seed3,
  };
};

/* privates */

// step the RNG to produce the next seed
// this is incredibly simple: multiply the state by a constant factor, modulus
// it by 2^32, and add a magic addend. The addend can be varied to produce
// independent RNGs, so it is stored as part of the seed. It is given to the
// new seed unchanged.
const next = ({ state, increment }: Seed): Seed => ({
  state: ((state * 1664525) + increment) >>> 0,
  increment,
});

// obtain a pseudorandom 32-bit integer from a seed
const peel = (state: number) => {
  // This is the RXS-M-SH version of PCG, see section 6.3.4 of the paper
  // and line 184 of pcg_variants.h in the 0.94 (non-minimal) C implementation,
  // the latter of which is the source of the magic constant.
  const word = ((state >>> ((state >>> 28) + 4)) ^ state) * 277803737;
  return (word ^ (word >>> 22)) >>> 0;
};

const { min, max, abs } = Math;

const addOne = <T>(value: T): Weighted<T> => ({ weight: 1, value });

const normalize = ({ weight }: Weighted<unknown>) => abs(weight);

const getByWeight = <T>(
  { value }: Weighted<T>,
  others: Weighted<T>[],
  countdown: number,
): T => {
  if (others.length === 0) return value;

  const l = others.length;

  for (let i = 0, j = countdown; i < l; i++) {
    const { weight, value: second } = others[i];
    if (j <= abs(weight)) return second;
    j = j - abs(weight);
  }

  return value;
};

const sumReducer = (a: number, b: number) => a + b;

const sum = (xs: number[]) => reduceArray(sumReducer, 0, xs);

const gen = integer();
