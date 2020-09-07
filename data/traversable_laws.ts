import Kind, { Ap, Kind2, Compose } from "../kind.ts";
import { AssertEquals } from "../test/asserts.ts";
import { testFunctor } from "./functor_laws.ts";
import { testFoldable } from "./foldable_laws.ts";
import Applicative from "../control/applicative.ts";
import Traversable from "./traversable.ts";

const compose = <U extends Kind2, V extends Kind>(
  { of: ofA, ap: apA, map: mapA }: Applicative<U>,
  { of: ofB, ap: apB, map: mapB }: Applicative<V>,
): Applicative<Compose<U, V>> => ({
  of: <A>(a: A): Ap<U, Ap<V, A>> => ofA<Ap<V, A>>(ofB<A>(a)),

  ap: <A, B>(
    a1: Ap<U, Ap<V, (x: A) => B>>,
    a2: Ap<U, Ap<V, A>>,
  ): Ap<U, Ap<V, B>> =>
    apA<Ap<V, A>, Ap<V, B>>(
      mapA<Ap<V, (x: A) => B>, (b2: Ap<V, A>) => Ap<V, B>>(
        (d: Ap<V, (x: A) => B>) => (b2: Ap<V, A>) => apB<A, B>(d, b2),
        a1,
      ),
      a2,
    ),

  map: <A, B>(f: (x: A) => B, a: Ap<U, Ap<V, A>>): Ap<U, Ap<V, B>> =>
    mapA<Ap<V, A>, Ap<V, B>>((b: Ap<V, A>) => mapB<A, B>(f, b), a),
});

export const testTraversable = <
  T extends Kind,
  A extends Kind2,
  B extends Kind,
  C,
  D,
>(
  { traverse, o: f, aa: A, ab: B, u: u, v: v, ...args }: Traversable<T> & {
    assertEquals: AssertEquals;
    ta: Ap<T, A>;
    d: B;
    f: (b: B) => C;
    g: (a: A) => B;
    n: (x: B, y: A) => B;
    u: Ap<A, Ap<T, C>>;
    v: Ap<T, Ap<A, C>>;
    aa: Applicative<A>;
    ab: Applicative<B>;
    o: (x: Ap<T, C>) => Ap<B, Ap<T, D>>;
  },
) => {
  testFunctor<T, A, B, C>(args);
  testFoldable<T, A, B>(args);

  const {
    assertEquals,
    ta: a,
  } = args;

  assertEquals(
    f(traverse<A, Ap<A, Ap<T, C>>, Ap<A, Ap<T, C>>>(
      A,
      (x: Ap<A, Ap<T, C>>) => x,
      u,
    )),
    traverse<B, C, D>(B, f, u),
    "traversable naturality law",
  );

  assertEquals(
    traverse<B, C, C>(B, B.of, a),
    B.of<Ap<T, C>>(a),
    "traversable identity law",
  );

  assertEquals(
    traverse<Compose<A, B>, Ap<A, C>, C>(
      compose<A, B>(A, B),
      (x: Ap<A, C>): Ap<A, C> => x,
      v,
    ),
    A.map<Ap<T, C>, Ap<B, Ap<T, C>>>(
      (v: Ap<T, C>): Ap<B, Ap<T, C>> => traverse<B, C, C>(B, (x: C): C => x, v),
      traverse<A, Ap<A, C>, C>(A, (x: Ap<A, C>): Ap<A, C> => x, v),
    ),
    "traversable composition law",
  );
};
