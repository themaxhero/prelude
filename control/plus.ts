import Kind, { Ap } from "../kind.ts";
import Alt from "./alt.ts";

export interface Plus<T extends Kind> extends Alt<T> {
  zero: <A>() => Ap<T, A>;
}

export default Plus;
