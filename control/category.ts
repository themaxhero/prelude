import Kind, { Ap } from "../kind.ts";
import Semigroupoid from "../control/semigroupoid.ts";

export interface Category<T extends Kind<Kind>> extends Semigroupoid<T> {
  id: <I, J>() => Ap<Ap<T, I>, J>;
}

export default Category;
