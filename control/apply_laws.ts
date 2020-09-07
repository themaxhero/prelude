import Kind, { Ap } from "../kind.ts";
import { AssertEquals } from "../test/asserts.ts";
import { testFunctor } from "../data/functor_laws.ts";
import Apply from "./apply.ts";

export const testApply = <T extends Kind, A, B, C>(
  { ap, ff: a, fg: u, ...args }: Apply<T> & {
    assertEquals: AssertEquals;
    ta: Ap<T, A>;
    f: (b: B) => C;
    g: (a: A) => B;
    ff: Ap<T, (b: B) => C>;
    fg: Ap<T, (a: A) => B>;
  },
) => {
  testFunctor<T, A, B, C>(args);

  const { map, assertEquals, ta: v } = args;

  assertEquals(
    ap<A, C>(
      ap<(x: A) => B, (x: A) => C>(
        map<(x: B) => C, (g: (x: A) => B) => (x: A) => C>(
          (f: (x: B) => C) => (g: (x: A) => B) => (x: A) => f(g(x)),
          a,
        ),
        u,
      ),
      v,
    ),
    ap<B, C>(a, ap<A, B>(u, v)),
    "apply composition law",
  );
};
