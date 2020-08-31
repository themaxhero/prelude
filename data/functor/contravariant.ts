import Kind, { Ap } from "../../kind.ts";
import { AssertEquals } from "../../test/asserts.ts";

export interface Contravariant<T extends Kind> {
  contramap: <A, B>(
    f: (x: A) => B,
    t: Ap<T, B>,
  ) => Ap<T, A>;
}

export default Contravariant;

export const testContravariant = <T extends Kind, A, B, C>(
  { contramap, assertEquals, a, f, g }:
    & Contravariant<T>
    & {
      assertEquals: AssertEquals;
      a: Ap<T, A>;
      f: (B: B) => C;
      g: (a: A) => B;
    },
) => {
  assertEquals(
    contramap<A, A>((x: A): A => x, a),
    a,
    "contravariant identity law",
  );

  assertEquals(
    contramap<A, C>((x: A) => f(g(x)), a),
    contramap<A, B>(g, contramap<B, C>(f, a)),
    "contravariant composition law",
  );
};
