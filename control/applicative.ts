import Kind, { Ap } from "../kind.ts";
import Apply from "./apply.ts";

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
