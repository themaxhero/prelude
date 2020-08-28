import { Kind2, Ap2 } from "../kind.ts";
import Semigroupoid from "../control/semigroupoid.ts";

export interface Category<T extends Kind2> extends Semigroupoid<T> {
  id: <I, J>() => Ap2<T, I, J>;
}

export default Category;
