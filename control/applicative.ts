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
  args: Applicative<T> & {
    assertEquals: AssertEquals;
    a: A;
    d: B;
    ta: Ap<T, A>;
    f: (c: A) => B;
    g: (b: B) => C;
    ff: Ap<T, (x: A) => B>;
    fg: Ap<T, (x: B) => C>;
  },
) => {
  testApply<T, A, B, C>(args);

  const { of, ap, assertEquals, ff: u, ta: v, g: f, d: x, a: y } = args;

  assertEquals(
    ap<A, A>(of<(x: A) => A>((x: A): A => x), v),
    v,
    "applicative identity law",
  );

  assertEquals(
    ap<B, C>(of<(b: B) => C>(f), of<B>(x)),
    of<C>(f(x)),
    "applicative homomorphism law",
  );

  assertEquals(
    ap<A, B>(u, of<A>(y)),
    ap<(x: A) => B, B>(of<(f: (c: A) => B) => B>((f: (c: A) => B) => f(y)), u),
    "applicative interchange law",
  );
};
