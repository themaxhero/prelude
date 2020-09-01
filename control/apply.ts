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
  { map, ap, assertEquals, a, u, v, f, g }:
    & Apply<T>
    & {
      assertEquals: AssertEquals;
      a: Ap<T, (x: B) => A>;
      u: Ap<T, (x: C) => B>;
      v: Ap<T, C>;
      f: (b: B) => A;
      g: (c: C) => B;
    },
) => {
  testFunctor<T, C, B, A>({ map, assertEquals, a: u, f, g });

  assertEquals(
    ap<C, A>(
      ap<(x: C) => B, (x: C) => A>(
        map<(x: B) => A, (g: (x: C) => B) => (x: C) => A>(
          (f: (x: B) => A) => (g: (x: C) => B) => (x: C) => f(g(x)),
          a,
        ),
        u,
      ),
      v,
    ),
    ap<B, A>(a, ap<C, B>(u, v)),
    "apply composition law",
  );
};
