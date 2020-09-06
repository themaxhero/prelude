import Kind, { Ap } from "../kind.ts";
import { AssertEquals } from "../test/asserts.ts";
import { testFunctor } from "../data/functor_laws.ts";
import Apply from "./apply.ts";

export const testApply = <T extends Kind, A, B, C>(
  args: Apply<T> & {
    assertEquals: AssertEquals;
    ta: Ap<T, A>;
    f: (c: A) => B;
    g: (b: B) => C;
    ff: Ap<T, (x: A) => B>;
    fg: Ap<T, (x: B) => C>;
  },
) => {
  const { map, ap, assertEquals, fg: a, ff: u, ta: v } = args;

  testFunctor<T, A, B, C>(args);

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
