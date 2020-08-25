export type Union<T extends Record<string, Def>> = {
  [K in keyof T]: Tag<Extract<K, string>, T[K]>;
}[keyof T];

export type Tag<T extends string = string, U extends Def = {}> = {
  readonly tag: T;
} & Readonly<U>;

interface Def {
  [key: string]: unknown;
  tag?: never;
}

type Match<T extends Tag, U> =
  | { [A in T["tag"]]: (t: Extract<T, Tag<A>>) => U }
  | { _: (t: T) => U };

type MatchAll<T extends Tag, U> = Extract<Match<T, U>, { _: unknown }>;

export const match = <T extends Tag, U>(m: Match<T, U>) =>
  (t: T): U =>
    // deno-lint-ignore no-explicit-any
    (m[t.tag as keyof typeof m] ?? (m as MatchAll<T, U>)._)(t as any);
