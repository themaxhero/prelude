import Kind, { Ap } from "../kind.ts";
import Apply, { testApply } from "./apply.ts";
import { AssertEquals } from "../test/asserts.ts";

export interface Applicative<T extends Kind> extends Apply<T> {
  of: <A>(x: A) => Ap<T, A>;
}

export default Applicative;

export const deriveApplicative = <T extends Kind>(
  { ap, of, ...rest }: Pick<Applicative<T>, "ap" | "of">,
): Applicative<T> => ({
  map: (f, u) => ap(of(f), u),
  ap,
  of,
  ...rest,
});

export const testApplicative = <T extends Kind, A, B, C>(
  args:
    & Applicative<T>
    & {
      assertEquals: AssertEquals;
      a: Ap<T, (x: B) => A>;
      u: Ap<T, (x: C) => B>;
      v: Ap<T, C>;
      f: (b: B) => A;
      g: (c: C) => B;
      x: B;
      y: C;
    },
) => {
  testApply<T, A, B, C>(args);

  const { of, ap, assertEquals, u, v, f, x, y } = args;

  assertEquals(
    ap<C, C>(of<(x: C) => C>((x: C): C => x), v),
    v,
    "applicative identity law",
  );

  assertEquals(
    ap<B, A>(of<(b: B) => A>(f), of<B>(x)),
    of<A>(f(x)),
    "applicative homomorphism law",
  );

  assertEquals(
    ap<C, B>(u, of<C>(y)),
    ap<(x: C) => B, B>(of<(f: (c: C) => B) => B>((f: (c: C) => B) => f(y)), u),
    "applicative interchange law",
  );
};
