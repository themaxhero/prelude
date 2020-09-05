import Kind, { Ap } from "../kind.ts";
import Functor, { testFunctor } from "../data/functor.ts";
import { AssertEquals } from "../test/asserts.ts";

export interface Apply<T extends Kind> extends Functor<T> {
  ap: <A, B>(
    tf: Ap<T, (x: A) => B>,
    ta: Ap<T, A>,
  ) => Ap<T, B>;
}

export default Apply;

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
