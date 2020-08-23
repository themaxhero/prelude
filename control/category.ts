import kind, { ap } from "../kind.ts";
import Semigroupoid from "../control/semigroupoid.ts";

export interface Category<T extends kind<kind>> extends Semigroupoid<T> {
  id: <I, J>() => ap<ap<T, I>, J>;
}

export default Category;
