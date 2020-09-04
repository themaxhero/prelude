import Kind, { Ap, Flip, Kind2, Compose } from "../kind.ts";
import Functor, { testFunctor } from "./functor.ts";
import Foldable, { testFoldable } from "./foldable.ts";
import Applicative from "../control/applicative.ts";
import { AssertEquals } from "../test/asserts.ts";

export interface Traversable<T extends Kind> extends Functor<T>, Foldable<T> {
  traverse: <U extends Kind, A, B>(
    a: Applicative<U>,
    f: (x: A) => Ap<U, B>,
    t: Ap<T, A>,
  ) => Ap<U, Ap<T, B>>;
}

export default Traversable;

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
        (b1: Ap<V, (x: A) => B>) => (b2: Ap<V, A>) => apB<A, B>(b1, b2),
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
  args: Traversable<T> & {
    assertEquals: AssertEquals;
    tA1: Ap<T, A>;
    fAB1: (a: A) => B;
    fBC1: (b: B) => C;
    b1: B;
    fBAB1: (x: B, y: A) => B;
    tATC1: Ap<A, Ap<T, C>>;
    aA1: Applicative<A>;
    aB1: Applicative<B>;
    fTCBTD1: (x: Ap<T, C>) => Ap<B, Ap<T, D>>;
    tAC1: Ap<T, Ap<A, C>>;
  },
) => {
  testFunctor<T, A, B, C>(args);
  testFoldable<T, A, B>(args);

  const {
    traverse,
    assertEquals,
    fTCBTD1: f,
    fTCBTD1: g,
    aA1: A,
    aB1: B,
    tATC1: u,
    tA1: a,
    tAC1: v,
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
