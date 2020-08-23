import kind, { ap } from "../kind.ts";
import Apply from "./apply.ts";

export interface Applicative<T extends kind> extends Apply<T> {
  of: <A>(x: A) => ap<T, A>;
}

export default Applicative;

export const deriveApplicative = <T extends kind>(
  { ap, of, ...rest }: Pick<Applicative<T>, "ap" | "of">,
): Applicative<T> => ({
  map: (f, u) => ap(of(f), u),
  ap,
  of,
  ...rest,
});
